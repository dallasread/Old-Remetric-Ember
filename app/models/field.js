import DS from 'ember-data';

export default DS.Model.extend({
  permalink: DS.attr('string'),
	type: DS.attr('string', { defaultValue: 'text' }),
	label: DS.attr('string'),
	isRequired: DS.attr('boolean', { defaultValue: true }),
	ordinal: DS.attr('number', { defaultValue: 999 }),
	isForProfile: DS.attr('boolean', { defaultValue: true }),
	publicAttr: function() {
		if (this.get('isForProfile')) {
			return 'person[' + this.get('permalink') + ']';
		} else {
			return this.get('permalink');
		}
	}.property('isForProfile', 'permalink')
});
