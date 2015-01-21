import DS from 'ember-data';

export default DS.DateTransform.extend({
  serialize: function(date) {
    return this._super(date);
  }
});