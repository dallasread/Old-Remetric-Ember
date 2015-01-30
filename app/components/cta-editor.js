import Ember from 'ember';

export default Ember.Component.extend({
	type: function() {
		return this.get('prettyName').toLowerCase().replace(/\s|\bwidget\b|\bform\b/g, '');
	}.property('prettyName'),
	allCTAs: Ember.computed.alias('session.organization.ctas'),
	ctas: Ember.computed.filter('allCTAs', function(cta) {
		return cta.get('type') === this.get('type');
	}).property('allCTAs', 'type')
});
