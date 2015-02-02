import Ember from 'ember';

export default Ember.Route.extend({
	redirect: function() {
		if (!this.get('session.user')) {
			this.transitionTo('signin');
		}
	}
});