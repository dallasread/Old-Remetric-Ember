import Ember from 'ember';

export default Ember.Component.extend({
	isInstalled: function() {
		return this.get('organization.apps').indexOf( this.get('app') ) !== -1;
	}.property('app', 'organization.apps'),
	actions: {
		install: function(app) {
			if (this.get('isInstalled')) {
				// if (confirm('Are you sure you want to uninstall this app?')) {
					this.get('organization.apps').removeObject(app);
					this.get('organization').save();
				// }
			} else {
				this.get('organization.apps').addObject(app);
				this.get('organization').save();
				alert('Visit the Apps page to start using ' + app.get('id') + '!');
			}
		}
	}
});
