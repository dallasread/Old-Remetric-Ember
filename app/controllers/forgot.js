import Ember from 'ember';

export default Ember.Controller.extend({
	loading: false,
	email: null,
	actions: {
		retrievePassword: function() {
			var e = this;
			e.set('loading', true);

			window._RMDB.resetPassword({
		    email: e.get('email')
		  }, function() {
				e.set('loading', false);
				e.set('email', null);
				alert('We have sent you an email with a temporary password. Be sure to change it as soon as you log in.');
				e.transitionToRoute('signin');
			});
		}
	}
});