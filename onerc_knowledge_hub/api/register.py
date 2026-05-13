# Copyright (c) 2026, Kenya Red Cross Society and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import validate_email_address, pas
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

	# Prevent duplicate email
	existing = frappe.db.get_value(
		"Localisation Hub User",
		{"preferred_contact_email": preferred_contact_email},
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
		"preferred_contact_email": preferred_contact_email,
		"company_email": company_email or "",
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

