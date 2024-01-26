# Copyright 2024 Therp BV
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl).

from odoo import models, fields


class EventEvent(models.Model):
    _inherit = 'event.event'

    event_user_name = fields.Char(string="User Name")
    event_email = fields.Char("User Email")
    event_photo = fields.Binary("Photo")
    event_url = fields.Char("Website")
    event_address = fields.Char("Address Location")
    event_phone_no = fields.Char("Phone No")
