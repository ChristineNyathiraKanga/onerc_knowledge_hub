# Copyright (c) 2026, Kenya Red Cross Society and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import validate_email_address
from frappe.utils.password import update_password

@frappe.whitelist(allow_guest=True)
def register_localisation_hub_user(
	first_name,
	last_name,
	preferred_contact_email,
	middle_name=None,
	phone_number=None,
	company_email=None,
	national_society=None,
	position=None,
	personnel_type=None,
	primary_language=None,
):
	# Validate email before touching the DB
	validate_email_address(preferred_contact_email, True)

	# Prevent duplicate email (note: field name has typo in database - "prefered" not "preferred")
	existing = frappe.db.get_value(
		"Localisation Hub User",
		{"prefered_contact_email": preferred_contact_email},
		"name",
	)
	if existing:
		frappe.throw(
			frappe._(
				"A registration with email {0} already exists ({1})."
			).format(preferred_contact_email, existing)
		)

	doc = frappe.get_doc({
		"doctype": "Localisation Hub User",
		"first_name": first_name,
		"middle_name": middle_name or "",
		"last_name": last_name,
		"prefered_contact_email": preferred_contact_email,  # Note: typo in database field name
		"company_email": company_email or preferred_contact_email,  # Use preferred email as fallback
		"phone_number": phone_number or "",
		"national_society": national_society,
		"position": position,
		"personnel_type": personnel_type,
		"primary_language": primary_language,
		"status": "Pending",
	})
	doc.insert(ignore_permissions=True)

	return {
		"localisation_hub_user": doc.name,
		"full_name": doc.full_name,
		"status": doc.status,
	}


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

	# Update password and enable the account
	update_password(user.name, new_password)

	user.enabled = 1
	user.save(ignore_permissions=True)

	return {"activated": True, "user": user.name}

