import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		this.store.findAll('event');
		this.store.findAll('person');
		this.store.findAll('cta');
	},
	actions: {
		loading: function() {
			Ember.$('.remetric .loading').stop().fadeIn();
		},
		didTransition: function() {
			Ember.$('.remetric .loading').stop().fadeOut();
		},
		back: function() {
			window.history.back();
		},
		signOut: function() {
			if (confirm("Are you sure you want to sign out?")) {
				window._RMDB.unauth();
				this.transitionTo('application');
			}
		},
		openModal: function(modalName, model) {
      if (model) {
				this.controllerFor(modalName).set('model', model);
			}
			
      return this.render(modalName, {
        into: 'application',
        outlet: 'modal'
      });
    }
	}
});