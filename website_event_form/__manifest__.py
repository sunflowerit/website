# Copyright 2024 Therp BV
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl).

{
    "name": "Website Event Form",
    "summary": "Create events from website form",
    "version": "16.0.1.0.0",
    "category": "Website",
    "website": "https://github.com/OCA/website",
    "author": "Therp BV, Odoo Community Association (OCA)",
    "license": "LGPL-3",
    "application": False,
    "installable": True,
    "depends": ["website_event"],
    "data": [
        "views/event_event.xml",
        "templates/snippets.xml"
    ],
    "assets": {
        "web.assets_frontend": [
            "/website_event_form/static/src/css/website_event_form.css",
            "/website_event_form/static/src/js/website_event_form.js",
        ],
    },
}
