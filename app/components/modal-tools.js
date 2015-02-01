import Ember from 'ember';
import jQuery from 'jquery';

export default Ember.Component.extend({
	close: true,
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
		var click = jQuery(e.target);
		
		if (!click.hasClass("modal_yield") && !click.closest(".modal_yield").length) {
			window.history.back();
		}
	},
	actions: {
    closeModal: function() {
			window.history.back();
    }
	}
});
