# Copyright (c) 2026, Kenya Red Cross Society and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import validate_email_address


class LocalisationHubUser(Document):
    # on save update full name
    def before_save(self):
        if self.full_name:
            names = self.full_name.split()
            self.first_name = names[0] if names else ""
            self.middle_name = names[1] if len(names) >= 2 else ""
            self.last_name = " ".join(names[2:]) if len(names) >= 3 else (names[1] if len(names) == 2 else "")
        self.full_name = " ".join(filter(None, [self.first_name, self.middle_name, self.last_name]))

@frappe.whitelist()
def create_user(localisation_hub_full_name, email=None, create_user_permission=0):
    usr = frappe.get_doc("Localisation Hub User", localisation_hub_full_name)

    if usr.user_id:
        frappe.throw(frappe._("User {0} already has a linked user").format(usr.name))

    # derive email from doc if not passed
    if not email:
        email = usr.prefered_contact_email or usr.company_email

    validate_email_address(email, True)

    # check for a User with this email
    if frappe.db.exists("User", email):
        frappe.throw(frappe._("User {0} already exists").format(email))

    names = (usr.full_name or "").split()
    first_name = names[0] if names else (usr.first_name or "")
    middle_name = names[1] if len(names) >= 2 else (usr.middle_name or "")
    last_name = " ".join(names[2:]) if len(names) >= 3 else (names[1] if len(names) == 2 else (usr.last_name or ""))

    # create user and add at least the "User" role before insert to avoid the "no roles enabled" warning
    user = frappe.get_doc({
        "doctype": "User",
        "email": email,
        "enabled": 1,
        "first_name": first_name,
        "middle_name": middle_name,
        "last_name": last_name,
        "phone": usr.phone_number
    })
    # user.append("roles", {"role": "Localisation Hub User"})
    user.insert()

    usr.db_set("user_id", user.name)
    usr.save()
    return user.name