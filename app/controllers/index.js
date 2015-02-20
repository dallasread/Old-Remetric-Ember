import Ember from 'ember';
import $ from 'jquery';

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
			
			var belongsOnPage = function(matcher, show) {
				var url = window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search;
				var included = matcher.split(',');

				for (var i = 0; i < included.length; i++) {
			    var include = included[i];
				  include = $.trim(include);
					
			    if (include !== '') {
						include = include.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
					  include = include.replace(/\\\*/g, '(.*?)');
					  include = new RegExp('(' + include + '|' + include + '/)$', 'g');
						
						if (include.test(url)) {
				      show = !show;
				      break;
						}
			    }
			  }
			
				return show;
			};
			
			this.get('session.ctas').then(function(ctas) {
				ctas.map(function(cta) {				
					if (cta.get('isActive')) {
						if (typeof $.cookie( cta.get('cookie') ) === 'undefined') {
							if (belongsOnPage(cta.get('pagesToShow'), false) && belongsOnPage(cta.get('pagesToHide'), true)) {
								setTimeout(function() {
									e.get('ctas').pushObject(cta);
								}, cta.get('spark.delay'));
							}
						}
					}
				});
			});
		}
	}
});
