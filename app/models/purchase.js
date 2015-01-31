/* globals Handlebars */	

import DS from 'ember-data';
import formatMoney from "accounting/format-money";

export default DS.Model.extend({
	description: DS.attr('string'),
	interval: DS.attr('string'),
	total: DS.attr('number'),
	isPaid: DS.attr('boolean'),
	app: DS.belongsTo('app', { async: true }),
	createdAt: DS.attr('timestamp'),
	paidAt: DS.attr('timestamp'),
	quantity: DS.attr('number'),
	per_quantity: DS.attr('number'),
	month: DS.attr('string'),
	items: DS.attr(),
	isQuantity: function() {
		return typeof this.get('quantity') !== 'undefined';
	}.property('quantity'),
	isApp: function() {
		return typeof this.get('app') !== 'undefined';
	}.property('app'),
	story: function() {
		if (this.get('interval') === 'monthly') {
			var story = 'Remetric Monthly for ' + this.get('month');
			story += '<ul>';
			
			for (var item in this.get('items')) {
				item = this.get('items')[item];
				story += '<li>' + item.name + ' @ ' + formatMoney(item.total) + '</li>';
			}
			
			story += '</ul>';
			return new Handlebars.SafeString( story );
		} else if (this.get('isQuantity')) {
			return this.get('quantity') + ' ' + this.get('description') + ' @ ' + formatMoney(this.get('per_quantity'));
		} else if (this.get('isApp')) {
			return this.get('app.name') + ' (Premium Version)';
		} else {
			return this.get('description');
		}
	}.property('interval', 'app.name', 'items', 'description')
});
