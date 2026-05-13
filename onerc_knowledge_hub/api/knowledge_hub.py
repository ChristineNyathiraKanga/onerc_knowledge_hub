import frappe


@frappe.whitelist(allow_guest=True)
def get_knowledge_hub_entries():
	entries = frappe.get_all(
		"Knowledge Hub",
		fields=[
			"name",
			"title",
			"category",
			"resource_type",
			"tools_subcategory",
			"summary",
			"description",
			"file_attachment",
			"external_url",
			"language",
			"contributing_ns",
			"uploaded_by",
			"status",
			"published_date",
			"view_count",
			"download_count",
			"is_highlighted",
			"highlight_order",
		],
		order_by="published_date asc",
	)
	return entries


@frappe.whitelist(allow_guest=True)
def get_knowledge_hub_categories():
	entries = frappe.get_all(
		"Category",
		fields=[
			"name",
			"category_name",
			"description",
		],
		order_by="category_name asc",
	)
	return entries
