/* globals Firebase */

import Ember from 'ember';

export default {
  name: 'session',
	after: 'store',
  initialize: function(container, app) {
		window._RMDB = new Firebase('https://remetric.firebaseio.com/');
		var organization_id = Ember.$('[data-remetric]').data('remetric');
		var store = container.lookup('store:main');
		
		store.find('organization', organization_id).then(function(organization) {
			var session = Ember.Object.create({
				organization: organization
			});
			
			app.register('session:main', session, { instantiate: false, singleton: true });
			app.inject('route', 'session', 'session:main');
			app.inject('controller', 'session', 'session:main');
			app.inject('component', 'session', 'session:main');
			app.inject('view', 'session', 'session:main');
			app.inject('model', 'session', 'session:main');
			
			app.advanceReadiness();
		});
		
		// container.injection('component', 'store', 'store:main');
		// container.injection('view', 'store', 'store:main');
		// session.setProperties(session_vars);
		
		app.deferReadiness();
	}
};
