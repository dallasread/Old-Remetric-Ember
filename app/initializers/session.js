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
		var router = container.lookup('router:main');
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
		

		var findOrCreateVisitor = function() {
			session.set('user', null);
			app.advanceReadiness();
		};
		
		store.find('organization', window._RMOID).then(function(organization) {
			session.set('organization', organization);
			
			window._RMDB.onAuth(function(auth) {
				if (auth) {
					store.find('user', auth.uid).then(function(user) {
						session.set('user', user);
						// router.transitionToRoute('dashboard');
						app.advanceReadiness();
					}, function() {
				    // alert("You are not permitted to log in.");
						window._RMDB.unauth();
						findOrCreateVisitor();
					});
				} else {
					findOrCreateVisitor();
				}
			});
		}, function() {
			findOrCreateVisitor();
		});
		
		app.deferReadiness();
	}
};
