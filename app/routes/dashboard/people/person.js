import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		this.store.findAll('event');
		return this.store.find('person', params.person_id);
  }
});