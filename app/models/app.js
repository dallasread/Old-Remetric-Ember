import DS from 'ember-data';

var App = DS.Model.extend({
  name: DS.attr('string'),
	description: DS.attr('string'),
	excerpt: DS.attr('string'),
	interval: DS.attr('string'),
	price: DS.attr('number'),
	hasTrial: DS.attr('boolean'),
	isActive: DS.attr('boolean'),
	isSystem: DS.attr('boolean'),
	ordinal: DS.attr('number'),
	colour: DS.attr('string'),
	installText: function() {
		return this.get('hasTrial') ? 'Try Free' : 'Free';
	}.property('hasTrial'),
	help: function() {
		return 'dashboard/apps/help/' + this.get('id');
	}.property('id'),
	icon: function() {
		return '/assets/imgs/apps/icons/' + this.get('id') + '.jpg';
	}.property('id')
});

App.reopenClass({
	FIXTURES: [{
		id: "analytics",
    description: "Get more info about your visitors.",
    hasTrial : true,
    interval : "monthly",
    isActive: false,
    name: "SuperAnalytics",
    ordinal: 2,
    price: 2900
  },
  {
		id: "booking",
    description: "Set your availability and allow your visitors to book appointments online.",
    excerpt : "Set your availability and allow your visitors to book appointments online.",
    hasTrial : true,
    interval: "once",
    isActive: false,
    name: "Appointment Booker",
    ordinal: 0,
    price: 49
  },
  {
		id: "box",
    colour: "green",
    description: "Prompt visitors to leave their email address.",
    hasTrial: true,
    isActive: true,
    name: "LeadBox",
    price: 0
  },
  {
		id: "callback",
    description: "Get your visitors to call you back.",
    excerpt: "Get your visitors to call you back.",
    isActive: false,
    name: "Call Me Back",
    ordinal: 1,
    price: 0
  },
  {
		id: "chat",
    colour: "#ca4e21",
    description: "Talk to your visitors live.",
    excerpt: "Chat with your visitors live to boost your engagement and raise your the ROI for your business. You'll always know who's online and how to get a hold of them.",
    hasTrial: true,
    interval: "monthly",
    isActive: true,
    name: "Live Chat",
    ordinal: 2,
    price: 2900
  },
  {
		id: "cobrowse",
    description: "Surf your website with your visitors to help guide them.",
    excerpt: "Surf your website with your visitors to help guide them.",
    hasTrial: true,
    interval: "monthly",
    isActive: false,
    name: "Shared Browser",
    ordinal: 3,
    price: 2900
  },
  {
		id: "courses",
    description: "Allow your visitors to sign up for a series of emails (with attachments).",
    excerpt: "Allow your visitors to sign up for a series of emails (with attachments).",
    interval: "monthly",
    isActive: false,
    name: "Courses",
    ordinal: 4,
    price: 2900
  },
  {
		id: "email",
    isActive: false,
    name: "Send Via Email",
    ordinal: 5
  },
  {
		id: "followup",
    description: "Automatically follow up with visitors.",
    excerpt: "Chat with your visitors live to boost your engagement and raise your the ROI for your business. You'll always know who's online and how to get a hold of them.",
    hasTrial: true,
    interval: "monthly",
    isActive: false,
    name: "Follow Up",
    ordinal: 6,
    price: 2900
  },
  {
		id: "forms",
    colour: "#0e8128",
    description: "Get your visitors to take action.",
    excerpt: "Chat with your visitors live to boost your engagement and raise your the ROI for your business. You'll always know who's online and how to get a hold of them.",
    isActive: false,
    name: "Action Forms",
    ordinal: 7,
    price: 0
  },
  {
		id: "giveaways",
    colour: "#38a1a0",
    description: "Give away ebooks, reports, and PDFs to generate leads.",
    excerpt: "Give away ebooks, reports, and PDFs to generate leads.",
    hasTrial: true,
    interval: "once",
    isActive: true,
    name: "Digital Give-A-Ways",
    ordinal: 8,
    price: 49
  },
  {
		id: "helpdesk",
    description: "Give support to your visitors via email.",
    excerpt: "Give support to your visitors via email.",
    hasTrial: true,
    interval: "monthly",
    isActive: false,
    name: "Email Helpdesk",
    ordinal: 9,
    price: 2900
  },
  {
		id: "invoices",
    isActive: false,
    name: "Invoices",
    ordinal: 10
  },
  {
		id: "landing",
    isActive: false,
    isSystem: false,
    name: "Landing Pages",
    ordinal: 11
  },
  {
		id: "permissions",
    isActive: false,
    isSystem: true,
    name: "User Permissions",
    ordinal: 12
  },
  {
		id: "polls",
    description: "Actionable, community-voted data.",
    excerpt: "Chat with your visitors live to boost your engagement and raise your the ROI for your business. You'll always know who's online and how to get a hold of them.",
    isActive: false,
    name: "Quick Polls",
    ordinal: 13,
    price: 0
  },
  {
		id: "sms",
    isActive: false,
    name: "Send via SMS",
    ordinal: 14
  },
  {
		id: "social",
    colour: "#375591",
    description: "Add social sharing buttons to your website to get your visitors sharing it across the web. ",
    excerpt: "Add social sharing buttons to your website to get your visitors sharing it across the web. ",
    isActive: true,
    name: "Social Sharing",
    ordinal: 15,
    price: 0
  },
  {
		id: "store",
    colour: "#5b1d9a",
    description: "Get apps to extend your site's functionality.",
    excerpt: "Get apps to extend your site's functionality.",
    isActive: true,
    isSystem: true,
    name: "Get More Apps",
    ordinal: 999
  },
  {
		id: "surveys",
    description: "Survey your visitors one-on-one.",
    excerpt: "Chat with your visitors live to boost your engagement and raise your the ROI for your business. You'll always know who's online and how to get a hold of them.",
    hasTrial: true,
    isActive: false,
    name: "Surveys",
    ordinal: 16,
    price: 49
  },
  {
		id: "thirdparty",
    isActive: false,
    name: "Third Party Integrations",
    ordinal: 17,
    price: 199999
  },
  {
		id: "topbar",
    colour: "#cbb826",
    description: "Add a call to action on the top of your website.",
    excerpt: "Add a call to action on the top of your website.",
    isActive: true,
    isSystem: false,
    name: "Top Bar",
    ordinal: 18,
    price: 0
  }]
});

export default App;