import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
	apps: DS.hasMany('apps', { async: true }),
	peopleInfo: DS.attr()
});
