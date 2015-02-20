import DS from 'ember-data';

export default DS.Model.extend({
  info: DS.attr({ defaultValue: {} }),
	createdAt: DS.attr('timestamp'),
	lastSeenAt: DS.attr('timestamp'),
	events: DS.hasMany('event', { async: true }),
	isKnown: DS.attr('boolean', { defaultValue: true }),
	name: function() {
		if (this.get('info.firstName.length')) {
			return this.get('info.firstName') + ' ' + this.get('info.lastName');
		} else {
			return this.get('info.name');
		}
	}.property('info.name', 'info.firstName', 'info.lastName')
});
