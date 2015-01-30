import Ember from 'ember';

export default Ember.Controller.extend({
	sortAppsBy: ['ordinal'],
	apps: Ember.computed.sort('model', 'sortAppsBy')
});