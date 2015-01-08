@rm ||= {}
@_RM ||= []

@_RMI ||= {}

_RMI.domain = "https://secure.remetric.com"
_RMI.api_key = false

_RMI.detectPushes = ->
	_RM.push = (args) ->
		Array.prototype.push.call this, args
		_RMI.parseEvents()

_RMI.parseEvents = ->
	for event in _RM
		event = _RM.shift()
	
		if event[0] == "domain"
			_RMI.domain = event[1]
		else if event[0] == "event"
			_RMI.track event[1], event[2]
		else if event[0] == "api_key"
			_RMI.api_key = event[1]

	_RMI.detectPushes()

_RMI.track = (data) ->
	img = document.createElement("img")
	img.style.display = "none"
	params = data
	base64 = encodeURIComponent btoa(JSON.stringify(params))
	img.src = "#{_RMI.domain}/api/#{_RMI.api_key}/events/#{base64}"
	document.body.appendChild img

_RMI.parseEvents()