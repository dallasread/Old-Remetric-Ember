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