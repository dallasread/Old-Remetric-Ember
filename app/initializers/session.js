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
			afterSignIn: false,
			isStripeLoaded: false
		});
		
		app.register('session:main', session, { instantiate: false, singleton: true });
		app.inject('route', 'session', 'session:main');
		app.inject('controller', 'session', 'session:main');
		app.inject('component', 'session', 'session:main');
		app.inject('view', 'session', 'session:main');
		app.inject('model', 'session', 'session:main');
		
		var advanceReadiness = function() {
			if (session.get('afterSignIn')) {
				router.transitionTo( 'dashboard' );
				session.set('afterSignIn', false);
			}
			
			app.advanceReadiness();
		};

		var findOrCreateVisitor = function() {
			session.set('user', null);
			advanceReadiness();
		};
		
		var setOnAuth = function() {
			window._RMDB.onAuth(function(auth) {
				if (auth) {
					store.find('user', auth.uid).then(function(user) {
						session.set('user', user);
						advanceReadiness();
					}, function(e) {
				    alert("You are not permitted to log in.");
						session.set('afterSignIn', false);
						window._RMDB.unauth();
						findOrCreateVisitor();
					});
				} else {
					findOrCreateVisitor();
				}
			});
		};
		
		store.find('organization', window._RMOID).then(function(organization) {
			session.set('organization', organization);
			setOnAuth();
		}, function() {
			setOnAuth();
		});
		
		app.deferReadiness();
	}
};
