import Ember from 'ember';

export default Ember.Route.extend({
	redirect: function(app) {
		this.transitionTo( 'dashboard.apps.' + app.get('id') );
	}
});