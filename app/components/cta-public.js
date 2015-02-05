/* globals _RMO */

import Ember from 'ember';

export default Ember.Component.extend({
	hasSubmitted: false,
	isClosed: false,
	isMinimized: false,
	didInsertElement: function() {
		if (this.get('cta')) {
			this.set('isMinimized', this.get('cta.isMinimized'));
		}
	},
	actions: {
		submitCTA: function(cta) {
			var e = this;
			
			this.get('store').find('person', 'Person3ID').then(function(person) {
				var event = cta.get('domId').find('form').serializeObject();
				event.story = "{{person.name}} submitted {{cta.name}}";
				event.person = event.person || {};
				event.person.id = person.get('id');
				event.cta = { name: cta.get('name'), id: cta.get('id') };
				_RMO.track(event);
				e.set('hasSubmitted', true);
			});
		},
		closeCTA: function() {
			this.set('isMinimized', false);
			this.set('isClosed', true);			
		},
		minimizeCTA: function() {
			this.set('isMinimized', true);
			this.set('isClosed', false);
		},
		openCTA: function() {
			this.set('isMinimized', false);
			this.set('isClosed', false);
		}
	}
});
