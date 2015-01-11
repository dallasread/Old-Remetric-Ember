# Remetric

## Next Steps

- Routes
- Activate Remetric with Serial Number
- Log In / Log Out
- Contacts Index
- Segments (just saving/naming a filter)
- Events
- App store
- Bottom box contact form
- Inline contact form
- Popup contact form
- Admins / Permissions
- Chat
- API to programatically set Visitor

## To add an event:

```
<img src='https://remetric.com/api/PUBLIC-API-TOKEN/events/BASE64-ENCODED-JSON-DATA'>
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

## Initial Data Structure

- Events
	- OrganizationID
		- EventID
			- PersonID
			- Data
			- Protected Data Fields
			- CreatedAt
- People
	- OrganizationID
		- PersonID
			- LastSeenAt
			- CreatedAt
			- UpdatedAt
			- IsUnknown
			- Data
- Segments
	- OrganizationID
		- SegmentID
			- Name
			- Queries
				- QueryID
					- Field
					- Matcher
					- Value
- CTAs
	- OrganizationID
		- CTAID
			- Name
			- Type
			- Data
- Users
	- UserID
		- Name
		- Username
		- Email
		- Password
- Media
	- OrganizationID
		- Name
		- Size
		- Type
		- URL
- Purchases
	- PurchaseID
		- Total
		- Items
			- Description
			- Amount
- Organizations
	- OrganizationID (public API key)
		- Name
		- Activated
		- Users
		- Total Disk
		- Stripe Token
		- Addons
			- AppID
			
* ONLY Logged In can write to People Data *