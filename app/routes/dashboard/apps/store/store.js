import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		install: function(app) {
			if (this.get('session.organization.apps.' + app.id)) {
				if (confirm('Are you sure you want to uninstall this app?')) {
					this.get('session.organization.apps').removeObject(app);
					this.get('session.organization').save();
				}
			} else {
				this.get('session.organization.apps').addObject(app);
				this.get('session.organization').save();
			}
		}
	}
});