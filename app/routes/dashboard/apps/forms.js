import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		this.set( 'session.currentApp', this.store.find('app', 'forms') );
		return this.store.findAll('cta');
	}
});