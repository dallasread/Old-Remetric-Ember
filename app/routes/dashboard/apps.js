import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		// console.log('ok2')
	},
	actions: {
		willTransition: function() {
			this.set( 'session.currentApp', null );
		}
	}
});