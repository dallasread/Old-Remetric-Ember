import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
	type: DS.attr('string'),
	createdAt: DS.attr('timestamp'),
	isActive: DS.attr('boolean'),
	headline: DS.attr('string'),
	subHeadline: DS.attr('string'),
	button: DS.attr({ defaultValue: {} }),
	hideForMobile: DS.attr('boolean', { defaultValue: false }),
	hideForTablet: DS.attr('boolean', { defaultValue: false }),
	hideForDesktop: DS.attr('boolean', { defaultValue: false }),
	pagesToShow: DS.attr('string', { defaultValue: '*' }),
	pagesToHide: DS.attr('string'),
	disableCSS: DS.attr('boolean'),
	scrollWithPage: DS.attr('boolean', { defaultValue: true }),
	showClose: DS.attr('boolean', { defaultValue: true }),
	thankYou: DS.attr({ defaultValue: {} }),
	ordinal: DS.attr('number'),
	social: DS.attr({ defaultValue: {} }),
	placement: DS.attr({ defaultValue: {} }),
	spark: DS.attr({ defaultValue: { delay: 0, event: 'load' } }),
	fields: DS.hasMany('field', { embedded: true }),
	hasSocial: function() {
		return this.get('type') === 'social';
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
	}.property('placement.style', 'placement.location')
});
