// Copyright (c) 2026, Kenya Red Cross Society and contributors
// For license information, please see license.txt

frappe.ui.form.on("Localisation Hub User", {
	refresh(frm) {
        // call method to create user
        // if (!frm.doc.user_id) {
        //     frm.add_custom_button(__("Create User"), () => {    
        //         frappe.call({
        //             method: "onerc_knowledge_hub.onerc_knowledge_hub.doctype.localisation_hub_user.localisation_hub_user.create_user",
        //             args: {
        //                 localisation_hub_user_name: frm.doc.name,
        //                 email: frm.doc.preferred_contact_email
        //             },
        //             freeze: true,
        //             freeze_message: __("Creating User...")
        //         }).then((r) => {
        //             if (r.message) {
        //                 frm.set_value("user_id", r.message);
        //                 frm.save();
        //                 frappe.msgprint(__("User created successfully."));
        //             } else {
        //                 frappe.msgprint(__("Failed to create user."));
        //             }
        //         });
        //     });
        // }

	},
});
