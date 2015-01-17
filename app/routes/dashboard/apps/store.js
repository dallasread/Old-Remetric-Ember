import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		install: function(app) {
			alert(app);
		}
	}
});