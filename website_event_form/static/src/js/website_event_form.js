odoo.define('website_event_form.EventProcessFormBtn', function(require) {
	'use strict';

	var publicWidget = require('web.public.widget');
	var time = require('web.time');

	publicWidget.registry.EventProcessFormBtn = publicWidget.Widget.extend({
		selector: '#event_process_form',
		events: {
			'click #event_process_form_btn': '_onClickProcessForm'
		},
		start: function() {
			let self = this;
			return this._super.apply(this, arguments).then(function() {
				$('#event_start_date').datepicker({
					showOtherMonths: true,
					dateFormat: "yy-mm-dd",
				});
				$('#event_end_date').datepicker({
					showOtherMonths: true,
					dateFormat: "yy-mm-dd",
				});

				// NB: Save photo file before we submit the form to avoid async
				// processes.
				document.getElementById('event_photo').addEventListener(
				'change', self._handle_file_upload.bind(self), false);

			});
		},
		_checkRequiredFields: function() {
			let formIsValid = true;
			$('#event_process_form :input').removeClass('red-border');
			$('#event_process_form :input[required]').each(function() {
				if (!$(this).val()) {
					$(this).addClass('red-border');
					formIsValid = false;
				}
			});
			return formIsValid;
		},
		_handle_file_upload: function(ev) {
			let self = this;
			this.uploaded_file_data = {};
			let file = ev.target.files[0];
			let reader = new FileReader();
			if (file)
				reader.readAsDataURL(file);

			reader.onloadend = function() {
				self.uploaded_file_data[ev.target.name] = reader.result.split(',')[1];
			};
		},
		_onClickProcessForm: function(ev) {
			let self = this;
			let inputValues = this.uploaded_file_data || {};
			let inputs = document.querySelectorAll(`#event_process_form input, #event_process_form textarea`);
			let $alert_message = $('#show_event_process_message');

			if (self._checkRequiredFields()) {
				inputs.forEach(function(input) {
					if (input.type !== 'file')
						inputValues[input.name] = input.value;
				});
				if (inputValues && !$.isEmptyObject(inputValues)) {
					self._rpc({
						route: '/event/process_form',
						params: inputValues,
					}).then((response) => {
						$('#event_process_form input, #event_process_form textarea').val('');
						alert(response.message);
					});
				}
			}
		}
	});

	return publicWidget.registry.EventProcessFormBtn;
})