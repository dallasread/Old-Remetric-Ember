import Ember from 'ember';

export default Ember.Controller.extend({
	init: function() {
		if (!this.get('session.organization')) {
			this.transitionToRoute( 'activate' );
		}
	}
});
