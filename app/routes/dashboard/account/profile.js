import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		resetProfile: function() {
			this.get('session.organization').rollback();
			this.get('session.user').rollback();
		},
		saveProfile: function() {
			window.aw = this.get('session.organization');
			this.get('session.organization').save();
			this.get('session.user').save();
		},
		toggleChangingPassword: function() {
			this.get('controller').toggleProperty('isChangingPassword');
		}
	}
});