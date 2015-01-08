(function() {
  this.rm || (this.rm = {});

  this._RM || (this._RM = []);

  this._RMI || (this._RMI = {});

  _RMI.domain = "https://secure.remetric.com";

  _RMI.api_key = false;

  _RMI.detectPushes = function() {
    return _RM.push = function(args) {
      Array.prototype.push.call(this, args);
      return _RMI.parseEvents();
    };
  };

  _RMI.parseEvents = function() {
    var event, _i, _len;
    for (_i = 0, _len = _RM.length; _i < _len; _i++) {
      event = _RM[_i];
      event = _RM.shift();
      if (event[0] === "domain") {
        _RMI.domain = event[1];
      } else if (event[0] === "event") {
        _RMI.track(event[1], event[2]);
      } else if (event[0] === "api_key") {
        _RMI.api_key = event[1];
      }
    }
    return _RMI.detectPushes();
  };

  _RMI.track = function(data) {
    var base64, img, params;
    img = document.createElement("img");
    img.style.display = "none";
    params = data;
    base64 = encodeURIComponent(btoa(JSON.stringify(params)));
    img.src = "" + _RMI.domain + "/api/" + _RMI.api_key + "/events/" + base64;
    return document.body.appendChild(img);
  };

  _RMI.parseEvents();

}).call(this);
