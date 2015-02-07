import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
	type: DS.attr('string'),
	createdAt: DS.attr('timestamp'),
	isActive: DS.attr('boolean'),
	headline: DS.attr('string', { defaultValue: 'Sign Up For Our Newsletter' }),
	subHeadline: DS.attr('string', { defaultValue: "Receive helpful, relevant tips from the experts." }),
	hideForMobile: DS.attr('boolean', { defaultValue: false }),
	hideForTablet: DS.attr('boolean', { defaultValue: false }),
	hideForDesktop: DS.attr('boolean', { defaultValue: false }),
	pagesToShow: DS.attr('string', { defaultValue: '*' }),
	pagesToHide: DS.attr('string'),
	disableCSS: DS.attr('boolean'),
	isSticky: DS.attr('boolean', { defaultValue: true }),
	isClosable: DS.attr('boolean', { defaultValue: false }),
	isMinimizable: DS.attr('boolean', { defaultValue: true }),
	isMinimized: DS.attr('boolean', { defaultValue: false }),
	ordinal: DS.attr('number'),
	placement: DS.attr({ defaultValue: {} }),
	css: DS.attr({ defaultValue: {
		general: {
			background: '#F2F2F2',
			text: '#333333'
		},
		header: {
			background: '#00519C',
			text: '#FFFFFF'
		},
		button: {
			background: '#1B8E58',
			text: '#FFFFFF'
		}
	}}),
	image: DS.attr({ defaultValue: { use: false } }),
	giveAway: DS.attr({ defaultValue: { use: false, text: 'Download Now!' } }),
	thankYou: DS.attr({ defaultValue: { text: 'Thanks for submitting your response.', isRedirect: false } }),
	button: DS.attr({ defaultValue: { text: 'Sign Up Now' } }),
	spark: DS.attr({ defaultValue: { delay: 0, event: 'load' } }),
	fields: DS.hasMany('field', { embedded: true }),
	notifications: DS.hasMany('notification', { embedded: true }),
	social: DS.hasMany('social', { async: true }),
	isSocial: function() {
		return this.get('type') === 'social';
	}.property('type'),
	isTopbar: function() {
		return this.get('type') === 'topbar';
	}.property('type'),
	isBox: function() {
		return this.get('type') === 'box';
	}.property('type'),
	placementString: function(key, placementString) {
		if (arguments.length === 1) {
      return this.get('placement.location') + ':' + this.get('placement.style');
    } else {
			var placement = (placementString + '').split(":");
			this.set('placement.location', placement[0]);
			this.set('placement.style', placement[1]);
			return placementString;
    }
	}.property('placement.style', 'placement.location'),
	publicClass: function() {
		var publicClass = 'remetric_cta';
		publicClass += ' remetric_cta_' + this.get('id');
		publicClass += ' remetric_cta_' + this.get('type');
		publicClass += ' remetric_cta_' + this.get('placement.location');
		publicClass += ' remetric_cta_' + this.get('placement.style');
		if (!this.get('disableCSS')) { publicClass += ' remetric_cta_css'; }
		if (this.get('isSticky')) { publicClass += ' remetric_cta_sticky'; }
		if (this.get('image.use')) { publicClass += ' remetric_use_image'; }
		if (this.get('hideForMobile')) { publicClass += ' remetric_hide-for-mobile'; }
		if (this.get('hideForTablet')) { publicClass += ' remetric_hide-for-tablet'; }
		if (this.get('hideForDesktop')) { publicClass += ' remetric_hide-for-desktop'; }
		return publicClass;
	}.property('id', 'placement.location', 'placement.style', 'disableCSS', 'image.use', 'hideForMobile', 'hideForDesktop', 'hideForTablet'),
	domId: function() {
		return Ember.$('.' + this.get('id'));
	}.property('id'),
	cookie: function() {
		return 'remetric-cta-' + this.get('id');
	}.property('id')
});
