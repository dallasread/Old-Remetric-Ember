import Ember from 'ember';

export default Ember.Controller.extend({
	eventData: function() {
		return JSON.stringify(this.get('model'), null, '\t');
	}.property('model')
});