import frappe


@frappe.whitelist(allow_guest=True)
def get_national_societies():
	"""Get list of all national societies for dropdown"""
	societies = frappe.get_all(
		"National Society",
		fields=["name", "full_official_name", "short_name", "country"],
		order_by="full_official_name asc",
	)
	return societies
