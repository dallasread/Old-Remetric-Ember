import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		return this.store.find('event', params.event_id);
  },
	actions: {
		willTransition: function(transition) {
			this.routeFor('application').send('openModal', 'dashboard.activity.event');
			transition.abort();
		}
	}
});