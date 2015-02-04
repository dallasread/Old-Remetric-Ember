import Ember from 'ember';

export default Ember.Controller.extend({
	init: function() {
		if (this.get('session.organization')) {
			this.send('checkCTAs');
		}
	},
	ctas: [],
	actions: {
		showCTA: function(cta) {
			var e = this;
			
			setTimeout(function() {
				e.get('ctas').pushObject(cta);
			}, cta.get('spark.delay'));
		},
		checkCTAs: function() {
			// Loop over CTAs, ordered by quickest trigger
			// For each trigger event
			//   IF INCLUDED && NOT EXCLUDED
			//     IF NOT SOLE
			//       Show CTA, record event
			//     IF SOLE
			//       Show first CTA and ignore the rest
			
			var e = this;
			
			this.get('session.ctas').then(function(ctas) {
				ctas.map(function(cta) {
					e.send('showCTA', cta);
				});
			})
		}
	}
});
