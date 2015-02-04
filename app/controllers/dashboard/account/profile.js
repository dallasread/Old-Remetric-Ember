import Ember from 'ember';

export default Ember.Controller.extend({
	isChangingPassword: false,
	isChangingEmail: false,
	oldEmail: null,
	init: function() {
		this.set('oldEmail', this.get('session.user.email'));
	},
	checkChangingEmail: function() {
		this.set('isChangingEmail', this.get('session.user.email') !== this.get('oldEmail'));
	}.observes('session.user.email', 'oldEmail'),
	isDirty: function() {
		return this.get('session.user.isDirty') || this.get('session.organization.isDirty');
	}.property('session.user.isDirty', 'session.organization.isDirty'),
	actions: {
		resetProfile: function() {
			this.get('session.organization').rollback();
			this.get('session.user').rollback();
		},
		saveProfile: function() {
			var e = this;
			
			var doSave = function() {
				e.set('oldPassword', '');
				e.set('newPassword', '');
				e.set('oldEmail', e.get('session.user.email'));
		  	e.set('isChangingPassword', false);
				e.set('isChangingEmail', false);
				e.get('session.organization').save();
				e.get('session.user').save();
			};
			
			if (e.get('isChangingEmail')) {
				if (e.get('oldEmail.length') && e.get('session.user.email.length') && e.get('oldPassword.length')) {
					window._RMDB.changeEmail({
						oldEmail: e.get('oldEmail'),
						newEmail: e.get('session.user.email'),
						password: e.get('oldPassword')
					}, function(error) {
						if (error) {
							alert(error);
						} else {
							doSave();
						}
					});
				} else {
					alert('Please supply your current password.');
				}
			} else if (e.get('isChangingPassword')) {
				if (e.get('newPassword.length') && e.get('session.user.email.length') && e.get('oldPassword.length')) {
					window._RMDB.changePassword({
					  email: e.get('session.user.email'),
					  oldPassword: e.get('oldPassword'),
					  newPassword: e.get('newPassword')
					}, function(error) {
					  if (error) {
							e.set('oldPassword', '');
					    alert(error);
					  } else {
							doSave();
					  }
					});	
				} else {
					alert('Error changing your email. Please try again.');
				}
			} else {
				doSave();
			}
		},
		toggleChangingPassword: function() {
			this.toggleProperty('isChangingPassword');
		}
	}
});