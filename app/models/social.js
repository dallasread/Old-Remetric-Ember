import DS from 'ember-data';
import config from './../config/environment';

var Social = DS.Model.extend({
  name: DS.attr('string'),
	ordinal: DS.attr('number'),
	url: DS.attr('string'),
    shareURL: function() {
        return this.get('url') + encodeURIComponent(window.location.href);
    }.property('url'),
	colour: DS.attr('string'),
	icon: function() {
		return config.assetsBaseURL + '/assets/imgs/social/' + this.get('id') + '.png';
	}.property('id')
});

Social.reopenClass({
	FIXTURES: [{
		ordinal: 0,
		id: 'facebook',
		name: 'Facebook',
		url: 'https://www.facebook.com/sharer/sharer.php?u=',
		colour: '#4861a3'
	}, {
		ordinal: 1,
		id: 'twitter',
		name: 'Twitter',
		url: 'http://www.twitter.com/share?url=',
		colour: '#55acee'
	}, {
		ordinal: 2,
		id: 'linkedin',
		name: 'LinkedIn',
		url: 'http://www.linkedin.com/shareArticle?mini=true&url=',
		colour: '#0075b7'
	}, {
		ordinal: 3,
		id: 'google',
		name: 'Google+',
		url: 'https://plus.google.com/share?url=',
		colour: '#d73d32'
	}, {
		ordinal: 4,
		id: 'pinterest',
		name: 'Pinterest',
		url: 'http://pinterest.com/pin/create/button/?url=',
		colour: '#bc1907'
	}]
});

export default Social;