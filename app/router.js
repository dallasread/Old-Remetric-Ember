import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.route("people", function() {
		this.route("segments/:segment_id");
		this.route("new");
		this.route(":person_id"); // DIALOG ACCESSIBLE FROM ANYWHERE
	});
	
	this.route("messages", function() {
		this.route("new");
	});
	
	this.route("activity", function() {
		this.route(":description");
	});
	
	this.route("apps", function() {
		this.route("store");
		this.route(":app_id");
	});

	this.route("account", function() {
		this.route("purchases");
		this.route("billing");
	});
	
	this.route("public", function() {
		this.route("chat");
		this.route("surveys");
	});

	this.route("organizations");
	this.route("activate");
});

export default Router;
