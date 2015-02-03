import DS from 'ember-data';

export default DS.Model.extend({
  permalink: DS.attr('string'),
	label: DS.attr('string'),
	isRequired: DS.attr('boolean'),
	ordinal: DS.attr('number', { defaultValue: 999 })
});
