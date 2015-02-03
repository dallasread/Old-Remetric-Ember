import Ember from 'ember';

export default Ember.Component.extend({
	allCTAs: [],
	store: null,
	currentCTA: Ember.computed.alias('session.cta'),
	type: function() {
		return this.get('prettyName').toLowerCase().replace(/\s|\bwidget\b|\bform\b|\bbox\b/g, '');
	}.property('prettyName'),
	ctas: Ember.computed.filter('allCTAs', function(cta) {
		return cta.get('type') === this.get('type');
	}).property('allCTAs', 'type'),
	actions: {
		editCTA: function(cta) {
			this.set('currentCTA', cta);
		},
		newCTA: function() {
			var cta = this.get('store').createRecord('cta', {
				name: this.get('prettyName') + ' #' + (this.get('ctas.length') + 1),
				type: this.get('type'),
				active: false
			}).save();
			this.set('currentCTA', cta);
		},
		saveCTA: function(cta) {
			cta.save();
		},
		deleteCTA: function(cta) {
			if (confirm("Are you sure you want to delete this " + this.get('prettyName') + "?")) {
				var e = this;
				cta.destroyRecord().then(function() {
					e.set('currentCTA', null);
				});
			}
		},
		resetCTA: function(cta) {
			cta.rollback();
		},
	}
});
