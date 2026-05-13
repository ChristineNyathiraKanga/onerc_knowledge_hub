# Copyright (c) 2026, Kenya Red Cross Society and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.utils import nowdate, random_string


@frappe.whitelist()
def get_pending_users(filters=None):
	"""
	Get list of Localisation Hub Users pending approval.
	Requires permission to manage users.
	"""
	if not frappe.has_permission("Localisation Hub User", "write"):
		frappe.throw(_("You don't have permission to manage users"), frappe.PermissionError)

	filters = filters or {}

	# Base filter for pending users
	base_filters = {"status": "Pending"}
	base_filters.update(filters)

	users = frappe.get_all(
		"Localisation Hub User",
		fields=[
			"name",
			"full_name",
			"first_name",
			"last_name",
			"prefered_contact_email",
			"phone_number",
			"position",
			"national_society",
			"primary_language",
			"status",
			"creation",
			"modified"
		],
		filters=base_filters,
		order_by="creation desc"
	)

	return users


@frappe.whitelist()
def get_all_hub_users(status=None):
	"""
	Get list of all Localisation Hub Users with optional status filter.
	"""
	if not frappe.has_permission("Localisation Hub User", "read"):
		frappe.throw(_("You don't have permission to view users"), frappe.PermissionError)

	filters = {}
	if status:
		filters["status"] = status

	users = frappe.get_all(
		"Localisation Hub User",
		fields=[
			"name",
			"full_name",
			"first_name",
			"last_name",
			"prefered_contact_email",
			"phone_number",
			"position",
			"national_society",
			"primary_language",
			"status",
			"user_id",
			"creation",
			"modified"
		],
		filters=filters,
		order_by="creation desc"
	)

	# Add user enabled status
	for user in users:
		if user.get("user_id"):
			user["user_enabled"] = frappe.db.get_value("User", user.user_id, "enabled")
		else:
			user["user_enabled"] = False

	return users


@frappe.whitelist()
def approve_user(localisation_hub_user, send_email=True):
	"""
	Approve a Localisation Hub User and create an inactive User account.
	The user will need to set a password to activate their account.
	"""
	if not frappe.has_permission("Localisation Hub User", "write"):
		frappe.throw(_("You don't have permission to approve users"), frappe.PermissionError)

	# Get the Localisation Hub User
	lhu = frappe.get_doc("Localisation Hub User", localisation_hub_user)

	if lhu.status == "Approved":
		frappe.throw(_("User is already approved"))

	if lhu.user_id:
		frappe.throw(_("User account already exists"))

	# Create User account (disabled by default)
	user = frappe.get_doc({
		"doctype": "User",
		"email": lhu.prefered_contact_email,
		"first_name": lhu.first_name,
		"last_name": lhu.last_name or "",
		"enabled": 0,  # Account is disabled until password is set
		"send_welcome_email": 0,
		"user_type": "System User",
	})

	user.insert(ignore_permissions=True)

	# Add default role (customize as needed)
	user.add_roles("Localisation Hub User Role")

	# Update Localisation Hub User
	lhu.status = "Approved"
	lhu.user_id = user.name
	lhu.save(ignore_permissions=True)

	# Send activation email
	if send_email:
		send_activation_email(lhu)

	frappe.db.commit()

	return {
		"success": True,
		"message": _("User approved successfully"),
		"user_id": user.name,
		"localisation_hub_user": lhu.name
	}


@frappe.whitelist()
def reject_user(localisation_hub_user, reason=None):
	"""
	Reject a Localisation Hub User application.
	"""
	if not frappe.has_permission("Localisation Hub User", "write"):
		frappe.throw(_("You don't have permission to reject users"), frappe.PermissionError)

	lhu = frappe.get_doc("Localisation Hub User", localisation_hub_user)

	if lhu.status == "Rejected":
		frappe.throw(_("User is already rejected"))

	if lhu.user_id:
		frappe.throw(_("Cannot reject user with existing user account"))

	# Update status
	lhu.status = "Rejected"

	# Optionally store rejection reason in a custom field (if it exists)
	if hasattr(lhu, 'rejection_reason') and reason:
		lhu.rejection_reason = reason

	lhu.save(ignore_permissions=True)
	frappe.db.commit()

	# Optionally send rejection email
	# send_rejection_email(lhu, reason)

	return {
		"success": True,
		"message": _("User application rejected")
	}


@frappe.whitelist()
def enable_user(localisation_hub_user):
	"""
	Enable a User account (admin can manually enable if needed).
	"""
	if not frappe.has_permission("User", "write"):
		frappe.throw(_("You don't have permission to enable users"), frappe.PermissionError)

	lhu = frappe.get_doc("Localisation Hub User", localisation_hub_user)

	if not lhu.user_id:
		frappe.throw(_("No user account exists for this person"))

	user = frappe.get_doc("User", lhu.user_id)

	if user.enabled:
		frappe.throw(_("User is already enabled"))

	user.enabled = 1
	user.save(ignore_permissions=True)
	frappe.db.commit()

	return {
		"success": True,
		"message": _("User account enabled successfully")
	}


@frappe.whitelist()
def disable_user(localisation_hub_user):
	"""
	Disable a User account.
	"""
	if not frappe.has_permission("User", "write"):
		frappe.throw(_("You don't have permission to disable users"), frappe.PermissionError)

	lhu = frappe.get_doc("Localisation Hub User", localisation_hub_user)

	if not lhu.user_id:
		frappe.throw(_("No user account exists for this person"))

	user = frappe.get_doc("User", lhu.user_id)

	if not user.enabled:
		frappe.throw(_("User is already disabled"))

	user.enabled = 0
	user.save(ignore_permissions=True)
	frappe.db.commit()

	return {
		"success": True,
		"message": _("User account disabled successfully")
	}


def send_activation_email(lhu):
	"""
	Send activation email to approved user with password setup link.
	"""
	try:
		# Generate activation link
		# In production, this should be a proper secure link
		activation_link = frappe.utils.get_url(f"/set-password?key={lhu.name}")

		# Email subject and message
		subject = "Your Africa Localisation Hub Account Has Been Approved"

		message = f"""
		<p>Dear {lhu.first_name},</p>

		<p>Congratulations! Your application to join the Africa Localisation Hub has been approved.</p>

		<p>To activate your account and set your password, please click the link below:</p>

		<p><a href="{activation_link}" style="display: inline-block; padding: 12px 24px; background-color: #DC2626; color: white; text-decoration: none; border-radius: 6px;">Activate Your Account</a></p>

		<p>Or copy and paste this link into your browser:</p>
		<p>{activation_link}</p>

		<p>This link will allow you to set your password and gain full access to the platform.</p>

		<p>If you did not request this account, please contact our support team immediately.</p>

		<p>Best regards,<br>
		The Africa Localisation Hub Team</p>
		"""

		frappe.sendmail(
			recipients=[lhu.prefered_contact_email],
			subject=subject,
			message=message,
			delayed=False
		)

		return True

	except Exception as e:
		frappe.log_error(f"Failed to send activation email to {lhu.prefered_contact_email}: {str(e)}")
		return False
