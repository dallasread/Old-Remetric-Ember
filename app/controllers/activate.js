/* globals _RMI, _RMO */

import Ember from 'ember';

export default Ember.Controller.extend({
	loading: false,
	actions: {
		register: function() {
			var e = this;
			e.set('loading', true);
			
			window._RMDB.createUser({
			  email: e.get('email'),
			  password: e.get('password')
			}, function(error, auth) {
			  if (error) {
					e.set('loading', false);
			    switch (error.code) {
			      case "EMAIL_TAKEN":
			        // TRY TO LOG USER IN
							alert('This email address has already been taken.');
			        break;
			      case "INVALID_EMAIL":
			        alert('Please enter a valid email address.');
			        break;
			      default:
			        alert(error);
			    }
			  } else {
					e.store.unloadAll('organization');
					e.set('session.afterSignIn', true);
				
					var organization = e.store.createRecord('organization', {
						id: e.get('session.organization_id')
					});
				
					e.store.find('app', 'store').then(function(store_app) {
						e.store.find('app', 'topbar').then(function(topbar_app) {
							organization.get('apps').then(function(apps) {
								apps.addObject(store_app);
								apps.addObject(topbar_app);
				
								var user = e.store.createRecord('user', {
									id: auth.uid,
									email: e.get('email'),
									name: e.get('name'),
									isCreator: true,
									isActive: true
								});

								organization.save().then(function() {
									user.save().then(function() {
										var trackEvent = function() {
											var event = {
												person: {
													id: user.get('id'),
													name: user.get('name'),
													email: user.get('email')
												},
												story: '{{person.name}} activated {{product.name}}.',
												product: { name: 'Remetric' }
											};
							
											_RMO.track(event);
										
											event.organization = {
												id: organization.get('id'),
												name: organization.get('name'),
												domain: organization.get('domain')
											};
											event.person.organization_id = e.get('session.organization_id');
											event.story = '{{person.name}} activated {{product.name}} ({{organization.id}}).';

											_RMI.track(event);
										};
										
										window._RMDB.child('accesses/' + user.get('id') + '/' + e.get('session.organization_id')).set(true);
										e.set('session.organization', organization);
								
										window._RMDB.authWithPassword({
										  email: e.get('email'),
										  password: e.get('password')
										}, function(error) {
										  if (error) {
												alert(error);
												e.set('loading', false);
											} else {
												trackEvent();
												e.set('email', null);
												e.set('password', null);
												e.set('loading', false);
											}
										});
									});
								});
							});
						});
					});
			  }
			});
		}
	}
});