import Ember from 'ember';

export default Ember.Controller.extend({
	loading: false,
	email: null,
	password: null,
	actions: {
		signIn: function() {
			var e = this;
			e.set('loading', true);
			e.set('session.afterSignIn', true);

			window._RMDB.authWithPassword({
			  email: e.get('email'),
			  password: e.get('password')
			}, function(error) {
			  if (error) {
					e.set('loading', false);
			    alert("Incorrect email or password.");
			  } else {
					e.set('email', null);
					e.set('password', null);
					e.set('loading', false);
			  }
			});
		}
	}
});