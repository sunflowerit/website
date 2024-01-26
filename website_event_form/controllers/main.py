# Copyright 2024 Therp BV
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl).

import logging
_logger = logging.getLogger(__name__)
from odoo import http, _
from odoo.exceptions import UserError
from odoo.http import request
from odoo.addons.website_event.controllers.main import WebsiteEventController


class WebsiteEventFormController(WebsiteEventController):

    @http.route('/event/process_form', type='json', auth="public",
                website=True)
    def website_event_process_form(self, **post):
        event_obj = request.env['event.event'].sudo()
        try:
            event = event_obj.create(post)
        except Exception as e:
            error = _("ERROR: %s" % e)
            _logger.error('\n\nERROR: %s\n\n' % error)
            return {
                'status': 'error',
                'message': '%s' % error
            }
        else:
            if event:
                return {
                    'status': 'success',
                    'message': _('Event submitted successfully!')
                }


