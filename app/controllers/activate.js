/* globals _RMI */

import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		register: function() {
			var e = this;
			
			window._RMDB.createUser({
			  email: e.get('email'),
			  password: e.get('password')
			}, function(error) {
			  if (error) {
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
					window._RMDB.authWithPassword({
					  email: e.get('email'),
					  password: e.get('password')
					}, function(error, auth) {
					  if (error) {
							alert(error);
						} else {
							e.store.unloadAll('organization');
							
							var organization = e.store.createRecord('organization', {
								id: e.get('session.organization_id')
							});
							
							e.store.find('app', 'store').then(function(store_app) {
								organization.get('apps').then(function(apps) {
									apps.addObject(store_app);
							
									var user = e.store.createRecord('user', {
										id: auth.uid,
										email: e.get('email'),
										name: e.get('name'),
										creator: true,
										active: true
									})
									
									user.save().then(function() {
										_RMI.track({
											person: {
												id: user.get('id'),
												name: user.get('name'),
												email: user.get('email'),
												organization_id: e.get('session.organization_id')
											},
											story: '{{person.name}} activated {{product.name}} ({{organization.id}}).',
											product: { name: 'Remetric' },
											organization: {
												id: organization.get('id'),
												name: organization.get('name'),
												domain: organization.get('domain')
											}
										});
										
										organization.save();
										e.set('session.organization', organization);
										e.transitionToRoute( 'dashboard' );
									});
								});
							});
						}
					});
			  }
			});
		}
	}
});