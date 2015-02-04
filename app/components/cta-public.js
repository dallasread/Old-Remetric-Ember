import Ember from 'ember';
import config from './../config/environment';

export default Ember.Component.extend({
	hasSubmitted: false,
	actions: {
		submitCTA: function(cta) {
			var e = this;
			
			this.get('store').find('person', 'Person3ID').then(function(person) {
				var event = Ember.$('.remetric_cta_' + cta.get('id') + ' form').serializeObject();
				event.story = "{{person.name}} submitted {{cta.name}}";
				event.person = event.person || {};
				event.person.id = person.get('id');
				event.cta = { name: cta.get('name'), id: cta.get('id') };
				_RMO.track(event);
				e.set('hasSubmitted', true);
			});
		}
	}
});
