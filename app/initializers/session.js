/* globals Firebase, _RMI */

import Ember from 'ember';
import config from './../config/environment';

export default {
  name: 'session',
	after: 'store',
  initialize: function(container, app) {
		window._RMDB = new Firebase('https://remetric.firebaseio.com/');
		window._RMOID = Ember.$('[data-remetric]').data('remetric').replace(/[^a-z0-9]+/gi, '-').replace(/^-*|-*$/g, '');
		_RMI.api_key = config.remetric.api_key;
		_RMI.domain = config.remetric.domain;
		
		var store = container.lookup('store:main');
		var session = Ember.Object.create({
			organization_id: window._RMOID,
			isStripeLoaded: false
		});
		
		app.register('session:main', session, { instantiate: false, singleton: true });
		app.inject('route', 'session', 'session:main');
		app.inject('controller', 'session', 'session:main');
		app.inject('component', 'session', 'session:main');
		app.inject('view', 'session', 'session:main');
		app.inject('model', 'session', 'session:main');
		
		store.find('organization', window._RMOID).then(function(organization) {
			session.set('organization', organization);
			app.advanceReadiness();
		}, function() {
			app.advanceReadiness();
		});
		
		app.deferReadiness();
	}
};
