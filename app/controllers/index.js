import Ember from 'ember';
import jQuery from 'jquery';

export default Ember.Controller.extend({
	init: function() {
		if (this.get('session.organization')) {
			this.send('checkCTAs');
		}
	},
	ctas: [],
	actions: {
		checkCTAs: function() {
			var e = this;
			
			this.get('session.ctas').then(function(ctas) {
				ctas.map(function(cta) {				
					if (cta.get('isActive')) {
						if (typeof jQuery.cookie( cta.get('cookie') ) === 'undefined') {
							setTimeout(function() {
								e.get('ctas').pushObject(cta);
							}, cta.get('spark.delay'));
						}
					}
				});
			});
		}
	}
});
