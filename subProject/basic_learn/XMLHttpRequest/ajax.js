/**
 * @author feng_Pc
 */

(function() {
	
	var F = feng.utils;
	var Interface = F.Interface;
	var AjaxHandler = new Interface('AjaxHandler', ['sendRequest']);
	
	function Ajax() {
		
	};
	F.extend(Ajax.prototype, {
		sendRequest : function(method, url, callback, postArgs) {
			var xhr = this.createXhr();
			xhr.onreadystatechange = function() {
				if (xhr.readystate != 4) return;
				if (xhr.status === 200){
					callback.success();
				} else {
					callback.fail();
				}
			};
			xhr.open(method, url, false);
			if (method == 'post' && postArgs) {
				xhr.send(postArgs);
			} else {
				xht.send();
			}
		},
		createXhr : function() {
			var xhr;
			try {
				xhr = new window.XMLHttpRequest();
				createXhr = function() {
					return new window.XMLHttpRequest();
				};
			} catch(e) {
				try {
					xhr = new ActiveXObject('Microsoft.XMLHTTP');
					createXhr = function() {
						return new ActiveXObject('Microsoft.XMLHTTP');
					};
				} catch(e) {
					try {
						xhr = new ActiveXObject('Msxml2.XMLHTTP');
						createXhr = function() {
							return new ActiveXObject('Msxml2.XMLHTTP');
						};
					} catch(e) {
						throw new Error('not support Ajax');
					}
				}
			}
			return xhr;
		},
		createXhr : function() {
			var xhr, methods = [
				function() {
					new window.XMLHttpRequest();
				},
				function() {
					new ActiveXObject('Msxml2.XMLHTTP');
				},
				function() {
					return new ActiveXObject('Msxml2.XMLHTTP');
				}
			];
			for (var i = 0, method; method = methods[i++]; ){
				try {
					xhr = method();
				} catch(e){
					continue;
				}
				createXhr = method[--i];
				return xhr;
			}
			throw new Error('Your Browse does not support Ajax!');
		}
		
	});
	
})();
