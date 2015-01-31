# Remetric

## Todo

- Activate Remetric with Serial Number
- Log In / Log Out
- Invite Users
- Permissions
- Contacts Index
- Events
- Bottom box contact form
- Inline contact form
- Popup contact form
- Call Me Back contact form
- Digital Giveaways
- Segments (just saving/naming a filter) / ElasticSearch
- Chat / XMPP - 2 convos per day trial
- Automessage to signed up users (using followup app)
- API to programatically set Visitor

## Listen Scripts

- When `organization.stripeCardToken` updated, create or update Stripe and `organization.stripeCustomerToken` if necessary.
- When `purchase` created, try to pay immediately. If paid, mark feature as available.
- Cron job to create monthly purchases.

## To add an event:

```
<img src='https://remetric.com/api/PUBLIC-API-TOKEN/events/{{BASE64-ENCODED-JSON-DATA}}'>
```

## Using the JS 

```
<script>
  (function(i,s,o,g,r,a,m){i['remetric']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://remetric.com/track.js','remetric');

  remetric('api_key', 'PUBLIC-API-TOKEN');
  remetric('event', {
  	id: 'PersonID', // Required
		story: '{{ person.name }} upgraded to the {{ plan.name }}', // Required - use dynamic tags from the supplied data
		createdAt: new Date(), // Optionally set the original time stamp
		plan: { // Accepts unlimited nested data
			id: 123,
			name: "Awesome"
		}
  });
</script>
```