/* globals Firebase, _RMI, _RMO, externalLoader */

import Ember from 'ember';
import jQuery from 'jquery';
import config from './../config/environment';

export default {
  name: 'session',
	after: 'store',
  initialize: function(container, app) {
		window._RMDB = new Firebase('https://remetric.firebaseio.com/');
		window._RMOID = Ember.$('[data-remetric]').data('remetric').replace(/[^a-z0-9]+/gi, '-').replace(/^-*|-*$/g, '');
		window._RMO = jQuery.extend({}, _RMI);
		
		_RMO.api_key = window._RMOID;
		_RMO.domain = config.remetric.domain;
		_RMI.api_key = config.remetric.api_key;
		_RMI.domain = config.remetric.domain;
		
		var loader = ['styles', 'user'];
		var loadComplete = function(loaded) {
			var index = loader.indexOf(loaded);
			loader.splice(index, 1);
			if (!loader.length) {
				app.advanceReadiness();
			}
		};
		
		var store = container.lookup('store:main');
		var router = container.lookup('router:main');
		var session = Ember.Object.create({
			organization_id: window._RMOID,
			afterSignIn: false,
			isStripeLoaded: false
		});
		
		externalLoader('/assets/lcs.css', function() {
			loadComplete( 'styles' );
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
			
			loadComplete( 'user' );
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
					}, function() {
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
