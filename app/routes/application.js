import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		loading: function() {
			Ember.$('.remetric .loading').stop().fadeIn();
		},
		didTransition: function() {
			Ember.$('.remetric .loading').stop().fadeOut();
		}
	}
});