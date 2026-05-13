# Copyright (c) 2026, Kenya Red Cross Society and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import today


class KnowledgeHub(Document):
	def validate(self):
		if not self.file_attachment and not self.external_url:
			frappe.throw("Either a file attachment or an external URL must be provided.")
		if self.resource_type == "Tools & Templates" and not self.tools_subcategory:
			frappe.throw("Tools & Templates resources require a subcategory.")

	def before_save(self):
		if self.status == "Published" and not self.published_date:
			self.published_date = today()
