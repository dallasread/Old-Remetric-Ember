import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		resetProfile: function() {
			this.get('session.organization').rollback();
			this.get('session.user').rollback();
		},
		saveProfile: function() {
			this.get('session.organization').save();
			this.get('session.user').save();
		},
		toggleChangingPassword: function() {
			this.get('controller').toggleProperty('isChangingPassword');
		}
	}
});