/* globals externalLoader, _RMO */

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
			externalLoader('https://js.stripe.com/v2/', function() {
				transition.send('stripeLoaded');
			});
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
						_RMO.track({
							story: '{{person.name}} entered their billing information for {{product.name}}.',
							person: { id: this.get('session.person.id'), isPayer: true },
							product: { name: 'Remetric' },
							organization: { id: this.get('session.organization_id') }
						});
					}
				});
			}
		}
	}
});