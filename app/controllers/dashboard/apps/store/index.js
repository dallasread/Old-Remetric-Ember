import Ember from 'ember';

export default Ember.Controller.extend({
	sortAppsBy: ['ordinal'],
	sortedApps: Ember.computed.sort('model', 'sortAppsBy'),
	apps: Ember.computed.filter('sortedApps', function(app) {
		return app.get('isActive') && !app.get('isSystem');
	}).property('sortedApps')
});