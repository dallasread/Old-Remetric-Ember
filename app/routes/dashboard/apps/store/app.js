import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		this.set( 'session.currentApp', this.store.find('app', 'store') );
		return this.store.find('app', params.app_id);
  }
});