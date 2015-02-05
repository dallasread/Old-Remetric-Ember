import Ember from 'ember';
import config from './../../../../config/environment';

export default Ember.Controller.extend({
	sortAppsBy: ['ordinal'],
	sortedApps: Ember.computed.sort('model', 'sortAppsBy'),
	apps: Ember.computed.filter('sortedApps', function(app) {
		return app.get('isActive') && !app.get('isSystem');
	}).property('sortedApps')
});