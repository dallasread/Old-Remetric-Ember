import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		return this.store.find('person', params.person_id);
  },
	actions: {
		willTransition: function(transition) {
			this.routeFor('application').send('openModal', 'dashboard.people.person');
			transition.abort();
		}
	}
});