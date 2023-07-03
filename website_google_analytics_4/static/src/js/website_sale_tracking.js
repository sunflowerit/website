odoo.define("website_google_analytics_4.tracking", function(require) {

var ajax = require('web.ajax');

$(document).ready(function () {

    if ($(".oe_website_sale div.oe_website_sale_tx_status_google4").length) {
        console.log("Google Analytics 4!!!");
        var order_id = $(".oe_website_sale div.oe_website_sale_tx_status_google4").data("order-id");
        vpv("/stats/ecom/order_confirmed/" + order_id);

        ajax.jsonRpc("/shop/tracking_last_order/").then(function(o) {
            if (o.transaction) {
                track_ga("event", "purchase", o.transaction);
            }

        });
    }

    function track_ga() {
        website_ga = this.gtag || function(){};
        website_ga.apply(this, arguments);
    }

});

});

