import Ember from 'ember';

export default Ember.Component.extend({
	closable: true,
	maxWidth: "500px",
	logoTitle: false,
	title: null,
	didInsertElement: function() {
		Ember.$('html, body').css('overflow', 'hidden');
	},
	willDestroyElement: function() {
		Ember.$('html, body').css('overflow', 'auto');
	},
	click: function(e) {
		if (this.get('closable')) {
			var click = Ember.$(e.target);

			if (!click.hasClass("modal_yield") && !click.closest(".modal_yield").length) {
				window.history.back();
			}
		}
	},
	actions: {
        closeModal: function() {
    			window.history.back();
        }
	}
});
