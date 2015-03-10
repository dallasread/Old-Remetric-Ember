@rm ||= {}
@_RM ||= []
@_RMI ||= {}

_RMI.domain = "https://remetric.com"
_RMI.api_key = false

_RMI.detectPushes = ->
    _ = this
	_RM.push = (args) ->
		Array.prototype.push.call this, args
		_.parseEvents()

_RMI.parseEvents = ->
	for event in _RM
		event = _RM.shift()
	
		if event[0] == "domain"
			this.domain = event[1]
		else if event[0] == "event"
			this.track event[1], event[2]
		else if event[0] == "api_key"
			this.api_key = event[1]

	this.detectPushes()

_RMI.track = (event) ->
	img = document.createElement("img")
	img.style.display = "none"
	event.page =
		title: document.title
		url: document.URL
	base64 = encodeURIComponent btoa(JSON.stringify(event))
	img.src = "#{this.domain}/api/#{this.api_key}/events/#{base64}"
	document.body.appendChild img

# _RMI.notify = (event, cta_id, notification_id) ->
# 	img = document.createElement("img")
# 	img.style.display = "none"
# 	event.page =
# 		title: document.title
# 		url: document.URL
# 	data =
# 		event: event
# 		cta_id: cta_id
# 		notification_id: notification_id
# 	base64 = encodeURIComponent btoa(JSON.stringify(data))
# 	img.src = "#{_RMI.domain}/api/#{_RMI.api_key}/notify/#{base64}"
# 	document.body.appendChild img

_RMI.parseEvents()