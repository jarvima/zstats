
var xform = {
	init: function() {
		if (typeof intel != 'undefined' && intel.xdk.cache) {
			this.cookies = intel.xdk.cookies;
		}
		else if (this.supportsCookies()) {
			this.initWithCookies();
		}
		else {
			this.initWithStorage();
		}
		
	},
	supportsCookies: function() {
		if (document.cookie) {
			console.log("supports cookies: [" + document.cookie + "]")
			return true;
		}
		document.cookie = 'xform_init=tmp test;';
		if (document.cookie) {
			document.cookie = "xform_init=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
			return true;
		}
		return false;
	},
	initWithCookies: function() {
		this.cookies = {};
		this.cookies.getCookie = function(name) {
		    var name = name + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0; i<ca.length; i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' ') c = c.substring(1);
		        if (c.indexOf(name) != -1) {
		        	return c.substring(name.length);
		        }
		    }
		    return null;
		};
		this.cookies.setCookie = function(name, value) {
			var expires = "Tue, 19 Jan 2038 03:14:07 GMT";
		    document.cookie = name + "=" + value + "; expires=" + expires;
		};
		this.cookies.removeCookie = function(name) {
			document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
		}
	},
	initWithStorage: function() {
		this.cookies = {};
		this.cookies.getCookie = function(name) {
			return localStorage[name];
		};
		this.cookies.setCookie = function(name, value) {
			localStorage[name] = value;
		};
		this.cookies.removeCookie = function(name) {
			localStorage.removeItem(name);
		}
	}
};

xform.init();