# Copyright (c) 2026, Kenya Red Cross Society and contributors
# For license information, please see license.txt

import frappe
import json
from frappe.utils import validate_email_address
from frappe.utils.password import update_password

#Creates a Localisation Hub User with status "Pending".
@frappe.whitelist(allow_guest=True)
def register_localisation_hub_user(
	first_name,
	last_name,
	national_society,
	middle_name=None,
	salutation=None,
	gender=None,
	phone_number=None,
	prefered_contact_email=None,
	preferred_contact_email=None,
	company_email=None,
	position=None,
	personnel_type=None,
	primary_language=None,
	bio=None,
	other_languages=None,
	expertise=None,
):

	# Use whichever email field is provided (frontend sends preferred_contact_email)
	email = preferred_contact_email or prefered_contact_email or company_email

	if not email:
		frappe.throw(frappe._("Email is required"))

	# Validate required email
	validate_email_address(email, True)

	# Prevent duplicate email (note: field name has typo in database - "prefered" not "preferred")
	existing = frappe.db.get_value(
		"Localisation Hub User",
		{"prefered_contact_email": email},
		"name",
	)
	if existing:
		frappe.throw(
			frappe._("A registration with email {0} already exists ({1}).").format(
				email, existing
			)
		)

	doc = frappe.get_doc({
		"doctype": "Localisation Hub User",
		"salutation": salutation,
		"first_name": first_name,
		"middle_name": middle_name or "",
		"last_name": last_name,
		"gender": gender,
		"company_email": company_email or email,
		"prefered_contact_email": email,
		"phone_number": phone_number or "",
		"national_society": national_society,
		"position": position,
		"personnel_type": personnel_type,
		"primary_language": primary_language,
		"bio": bio or "",
		"other_languages": [],
		"expertise": [],
		"status": "Pending",
	})

	# Table MultiSelect: other_languages — rows have field `language_name`
	if other_languages:
		langs = json.loads(other_languages) if isinstance(other_languages, str) else other_languages
		for lang in langs:
			doc.append("other_languages", {"language_name": lang})

	# Table MultiSelect: expertise — rows have field `expertise`
	if expertise:
		exp_list = json.loads(expertise) if isinstance(expertise, str) else expertise
		for exp in exp_list:
			doc.append("expertise", {"expertise": exp})

	doc.insert(ignore_permissions=True)

	return {
		"localisation_hub_user": doc.name,
		"full_name": doc.full_name,
		"status": doc.status,
	}


#Frappe User created after admin approves and user sets password
@frappe.whitelist(allow_guest=True)
def check_registration_status(email):
	"""
	Check the status of a Localisation Hub User registration by email.
	Returns status information: Pending, Approved, Rejected
	"""
	if not email:
		frappe.throw(frappe._("Email is required"))

	validate_email_address(email, True)

	# Note: field name has typo in database - "prefered" not "preferred"
	lhu = frappe.db.get_value(
		"Localisation Hub User",
		{"prefered_contact_email": email},
		["name", "status", "user_id", "full_name", "creation", "modified"],
		as_dict=True,
	)

	if not lhu:
		return {
			"found": False,
			"message": "No registration found with this email"
		}

	result = {
		"found": True,
		"name": lhu.name,
		"full_name": lhu.full_name,
		"status": lhu.status,
		"created_on": lhu.creation,
		"last_updated": lhu.modified,
		"has_user_account": bool(lhu.user_id),
	}

	# If approved and has user account, check if it's activated
	if lhu.status == "Approved" and lhu.user_id:
		user_enabled = frappe.db.get_value("User", lhu.user_id, "enabled")
		result["user_enabled"] = bool(user_enabled)

	return result


@frappe.whitelist(allow_guest=True)
def set_password_and_activate(localisation_hub_user, new_password):
	if not localisation_hub_user:
		frappe.throw(frappe._("Invalid request"))

	lhu = frappe.db.get_value(
		"Localisation Hub User",
		localisation_hub_user,
		["name", "user_id", "status"],
		as_dict=True,
	)

	if not lhu:
		frappe.throw(frappe._("Localisation Hub User not found"))

	if lhu.status != "Approved":
		frappe.throw(frappe._("Your application has not been approved yet"))

	if not lhu.user_id:
		frappe.throw(frappe._("No system user linked to this account"))

	user = frappe.get_doc("User", lhu.user_id)

	if user.enabled:
		frappe.throw(frappe._("Account is already active"))

	update_password(user.name, new_password)
	user.enabled = 1
	user.save(ignore_permissions=True)

	return {"activated": True, "user": user.name}

#update status of Localisation Hub User to Approved and create User account
@frappe.whitelist()
def approve_localisation_hub_user(name):
	frappe.only_for("LH Admin", "System Manager")

	lhu = frappe.get_doc("Localisation Hub User", name)
	if lhu.status != "Pending":
		frappe.throw(frappe._("Only users with Pending status can be approved"))

	if lhu.user_id:
		frappe.throw(frappe._("User account already exists for this person"))

	# Create inactive User account
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

	# Add default role - customize as needed
	# user.add_roles("Localisation Hub User Role")

	# Update LH User status and link to User account
	lhu.status = "Approved"
	lhu.user_id = user.name
	lhu.save(ignore_permissions=True)

	# Send activation email
	send_activation_email(lhu)

	frappe.db.commit()

	return {
		"name": lhu.name,
		"status": lhu.status,
		"user_id": user.name,
		"message": "User approved and activation email sent"
	}


def send_activation_email(lhu):
	"""Send activation email to approved user with password setup link."""
	try:
		# Generate activation link
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

#Reject a Localisation Hub User application
@frappe.whitelist()
def reject_localisation_hub_user(name, reason=None):
	frappe.only_for("LH Admin", "System Manager")

	lhu = frappe.get_doc("Localisation Hub User", name)

	if lhu.status == "Rejected":
		frappe.throw(frappe._("User is already rejected"))

	if lhu.user_id:
		frappe.throw(frappe._("Cannot reject user with existing user account"))

	lhu.status = "Rejected"
	lhu.save(ignore_permissions=True)

	frappe.db.commit()

	return {
		"name": lhu.name,
		"status": lhu.status,
		"message": "User application rejected"
	}


#Get list of pending Localisation Hub Users
@frappe.whitelist()
def get_pending_users():
	frappe.only_for("LH Admin", "System Manager")

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
		filters={"status": "Pending"},
		order_by="creation desc"
	)

	return users


#Get all Localisation Hub Users with optional status filter
@frappe.whitelist()
def get_all_hub_users(status=None):
	frappe.only_for("LH Admin", "System Manager")

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


# Link Lookup APIs
@frappe.whitelist(allow_guest=True)
def get_national_societies():
	"""Returns all National Society records"""
	return frappe.get_all(
		"National Society",
		fields=["name", "full_official_name", "short_name", "country"],
		order_by="full_official_name asc",
	)


@frappe.whitelist(allow_guest=True)
def get_languages():
	"""Returns all Language records"""
	return frappe.get_all(
		"Language",
		fields=["name", "language_name"],
		order_by="language_name asc",
	)


@frappe.whitelist(allow_guest=True)
def get_designations():
	"""Returns all Designation records"""
	return frappe.get_all(
		"Designation",
		fields=["name"],
		order_by="name asc",
	)


@frappe.whitelist(allow_guest=True)
def get_salutations():
	"""Returns all Salutation records"""
	return frappe.get_all(
		"Salutation",
		fields=["name"],
		order_by="name asc",
	)


@frappe.whitelist(allow_guest=True)
def get_genders():
	"""Returns all Gender records"""
	return frappe.get_all(
		"Gender",
		fields=["name"],
		order_by="name asc",
	)


@frappe.whitelist(allow_guest=True)
def get_expertise_options():
	"""Returns all Expertise"""
	return frappe.get_all(
		"Expertise Selector",
		fields=["name", "expertise"],
		order_by="expertise asc",
	)

@frappe.whitelist(allow_guest=True)
def get_other_languages():
	"""Returns all Selector Language records"""
	return frappe.get_all(
		"Language Selector",
		fields=["name", "language_name"],
		order_by="language_name asc",
	)