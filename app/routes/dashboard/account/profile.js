import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		resetProfile: function() {
			this.get('session.organization').rollback();
		},
		saveProfile: function() {
			this.get('session.organization').save();
		}
	}
});