import DS from 'ember-data';

export default DS.Model.extend({
  info: DS.attr(),
	createdAt: DS.attr('timestamp'),
	lastSeenAt: DS.attr('timestamp'),
	events: DS.hasMany('event', { async: true }),
	isUnknown: DS.attr('boolean', { defaultValue: true }),
	name: function() {
		return this.get('info.firstName') + ' ' + this.get('info.lastName');
	}.property('info.firstName', 'info.lastName')
});
