import Ember from 'ember';

export default Ember.Controller.extend({
	active: function() {
		return this.get('session.cta.id') === this.get('model.id');
	}.property('session.cta.id')
});