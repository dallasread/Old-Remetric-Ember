import Ember from 'ember';

export default Ember.Checkbox.extend({
	social: null,
	cta: null,
	checkChecked: function() {
		var e = this;
		this.get('cta.social').then(function(social) {
			if (e.get('checked')) {
				social.addObject( e.get('social') );
			} else {
				social.removeObject( e.get('social') );
			}
		});
	}.observes('checked'),
	checked: function() {
		return this.get('cta.social').indexOf(this.get('social')) !== -1;
	}.property('cta.social', 'social')
});
