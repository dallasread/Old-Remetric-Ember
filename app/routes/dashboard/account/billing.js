import Ember from 'ember';
import config from './../../../config/environment';

export default Ember.Route.extend({
	beforeModel: function(transition) {
		if (!this.get('session.isStripeLoaded')) {
			transition.send('loadStripe', transition);
		}
	},
	actions: {
		loadStripe: function(transition) {
			var url = 'https://js.stripe.com/v2/';
			var script = document.createElement("script");
	    script.type = "text/javascript";

	    if (script.readyState) {
				script.onreadystatechange = function() {
					if (script.readyState === "loaded" || script.readyState === "complete") {
						script.onreadystatechange = null;
						transition.send('stripeLoaded');
					}
        };
	    } else {
				script.onload = function() {
					transition.send('stripeLoaded');
				};
	    }

	    script.src = url;
	    document.getElementsByTagName("head")[0].appendChild(script);
		},
		stripeLoaded: function() {
			window.Stripe.setPublishableKey( config.stripePublishableKey );
			this.set('session.isStripeLoaded', true);
		},
		changeCard: function() {
			this.set('session.organization.stripeCardToken', '');
			this.set('session.organization.stripeCustomerToken', '');
		},
		resetOrganization: function() {
			this.get('session.organization').rollback();
		},
		saveOrganization: function() {
			var org = this.get('session.organization');
			
			if (org.get('hasCard')) {
				org.save();
			} else {
				window.Stripe.card.createToken(Ember.$('.stripe_form:first'), function(status, response) {
					if (response.error) {
						alert(response.error.message);
					} else {
						org.rollback();
						org.set('stripeCardToken', response.id);
						org.set('card', response.card);
						org.save();
					}
				});
			}
		}
	}
});