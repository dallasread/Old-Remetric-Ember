import Ember from 'ember';

export default Ember.Controller.extend({
	init: function() {
		if (!this.get('session.organization')) {
			this.transitionToRoute( 'activate' );
		} else {
			this.send('checkCTAs');
		}
	},
	actions: {
		checkCTAs: function() {
			this.get('session.ctas').then(function(ctas) {
				ctas.map(function(cta) {
					console.log(cta.get('name'))
				});
			})
		}
	}
});
