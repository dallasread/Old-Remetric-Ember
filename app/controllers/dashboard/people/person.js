import Ember from 'ember';

export default Ember.Controller.extend({
	infoData: function() {
		return JSON.stringify(this.get('model.info'), null, '\t');
	}.property('model.info')
});