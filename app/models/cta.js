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
	isMinimizable: DS.attr('boolean', { defaultValue: false }),
	isMinimized: DS.attr('boolean', { defaultValue: false }),
	ordinal: DS.attr('number'),
	social: DS.attr({ defaultValue: {} }),
	placement: DS.attr({ defaultValue: {} }),
	image: DS.attr({ defaultValue: { use: false } }),
	thankYou: DS.attr({ defaultValue: { text: 'Thanks for submitting your response.', isRedirect: false } }),
	button: DS.attr({ defaultValue: { text: 'Sign Up Now' } }),
	spark: DS.attr({ defaultValue: { delay: 0, event: 'load' } }),
	fields: DS.hasMany('field', { embedded: true }),
	hasSocial: function() {
		return this.get('type') === 'social';
	}.property('type'),
	socialArray: function() {
		var socialArray = [];
		var social = this.get('social');
		
		for (var key in social) {
			var info = {
				network: key,
				url: social[key]
			};
		
			socialArray.push(info);
		}
		
		return socialArray;
	}.property('social'),
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
	}.property('id')
});
