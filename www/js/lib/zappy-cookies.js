
zappy.cookies =  {
	sub: '\32', // substitute character
	read: function(key) {
		var value = xform.cookies.getCookie(key);
		if (!value) {
			return null;
		}
		return JSON.parse(value.replace(/\32/g, ';'));
	},
	write: function(key, obj) {
		xform.cookies.setCookie(key, JSON.stringify(obj).replace(/;/g, this.sub), -1);
	},
	remove: function(key) {
		xform.cookies.removeCookie(key);
	}
};