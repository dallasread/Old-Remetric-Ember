(function() {
  this.rm || (this.rm = {});

  this._RM || (this._RM = []);

  this._RMI || (this._RMI = {});

  _RMI.domain = "https://remetric.com";

  _RMI.api_key = false;

  _RMI.detectPushes = function() {
    var _;
    return _ = this;
  };

  _RM.push = function(args) {
    Array.prototype.push.call(this, args);
    return _.parseEvents();
  };

  _RMI.parseEvents = function() {
    var event, _i, _len;
    for (_i = 0, _len = _RM.length; _i < _len; _i++) {
      event = _RM[_i];
      event = _RM.shift();
      if (event[0] === "domain") {
        this.domain = event[1];
      } else if (event[0] === "event") {
        this.track(event[1], event[2]);
      } else if (event[0] === "api_key") {
        this.api_key = event[1];
      }
    }
    return this.detectPushes();
  };

  _RMI.track = function(event) {
    var base64, img;
    img = document.createElement("img");
    img.style.display = "none";
    event.page = {
      title: document.title,
      url: document.URL
    };
    base64 = encodeURIComponent(btoa(JSON.stringify(event)));
    img.src = "" + this.domain + "/api/" + this.api_key + "/events/" + base64;
    return document.body.appendChild(img);
  };

  _RMI.parseEvents();

}).call(this);
