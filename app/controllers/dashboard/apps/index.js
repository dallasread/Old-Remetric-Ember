import Ember from 'ember';

export default Ember.Controller.extend({
	sortAppsBy: ['ordinal'],
	allApps: Ember.computed.alias('session.organization.apps'),
	apps: Ember.computed.sort('allApps', 'sortAppsBy')
});