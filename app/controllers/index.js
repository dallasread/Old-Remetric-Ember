import Ember from 'ember';

export default Ember.Controller.extend({
	init: function() {
		if (this.get('session.organization')) {
			this.send('checkCTAs');
		}
	},
	ctas: [],
	actions: {
		checkCTAs: function() {
			// Loop over CTAs, ordered by quickest trigger
			// For each trigger event
			//   IF NOT SOLE
			//     Show CTA, record event
			//   IF SOLE
			//     Show first CTA and ignore the rest
			
			var e = this;
			
			this.get('session.ctas').then(function(ctas) {
				ctas.map(function(cta) {
					e.get('ctas').pushObject(cta);
				});
			})
		}
	}
});
