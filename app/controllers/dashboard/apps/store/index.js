import Ember from 'ember';
import config from './../../../../config/environment';

export default Ember.Controller.extend({
	sortAppsBy: ['ordinal'],
	sortedApps: Ember.computed.sort('model', 'sortAppsBy'),
	apps: Ember.computed.filter('sortedApps', function(app) {
		// && this.get('session.organization.apps').indexOf(app) === -1
		console.log(config.environment)
		if (config.environment === 'development') {
			return true;
		} else {
			return app.get('isActive') && !app.get('isSystem');
		}
	}).property('sortedApps')
});