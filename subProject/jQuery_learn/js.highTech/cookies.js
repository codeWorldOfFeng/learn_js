/**
 * @author feng_Pc
 */

(function() {
	var cookies = {
		name : 'cookies.name',
		value : 'cookies.value',
		domain : 'baidu.com',
		path : '/images',
		expires : 'a week',
		secure : 'secure'
	};
	function Cookie(name, value, domain, path, expires, secure) {
		this.name = name;
		this.value = value;
		this.domain = domain;
		this.path = path;
		this.expires = expires;
		this.secure = secure;
	}


	Cookie.prototype = {
		constructor : Cookie,
		toString : function() {
			var code = encodeURIComponent;
			var result = code(this.name) + '=' + code(this.value);
			var keys = ['domain', 'path', 'expires', 'secure'];
			keys.forEach(function(key, index, array) {
				if (this[key]) {
					result += '; ' + code(key) + '=' + code(this[key]);
				}
			}, this);
			return result;
		},
		add : function() {
			document.cookie = this.toString();
		}
	};

	var cookie = new Cookie('id', 20074050616);
	var str = cookie.toString();
	
	cookie.add();

})();
