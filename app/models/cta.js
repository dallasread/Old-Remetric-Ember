import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
	type: DS.attr('string'),
	createdAt: DS.attr('timestamp'),
	isActive: DS.attr('boolean'),
	hideForMobile: DS.attr('boolean', { defaultValue: false }),
	hideForTablet: DS.attr('boolean', { defaultValue: false }),
	hideForDesktop: DS.attr('boolean', { defaultValue: false }),
	pagesToShow: DS.attr('string', { defaultValue: '*' }),
	pagesToHide: DS.attr('string'),
	disableCSS: DS.attr('boolean'),
	scrollWithPage: DS.attr('boolean', { defaultValue: true }),
	showClose: DS.attr('boolean', { defaultValue: true }),
	thankYouText: DS.attr('string'),
	thankYouURL: DS.attr('string'),
	social: DS.attr({ defaultValue: {} }),
	fields: DS.hasMany('field', { embedded: true }),
	hasSocial: function() {
		return this.get('type') === 'social';
	}.property('type')
});
