/**
 * @author feng_Pc
 */
(function() {
	var feng = {};

	feng.utils = feng.utils || {};

	// jsLock start
	feng.utils.Lock = Lock;
	function Lock() {
		this.data = {};
	};
	Lock.prototype = {
		constructor : feng.utils.Lock,
		checkKey : function(key) {
			return key ? true : false;
		},
		regLock : function(key) {
			if (!this.checkKey(key)) {
				throw new Error('key is not right.');
			}
			this.data[key] = {
				lock : false,
				time : -1,
				thread : null
			};
		},
		lock : function(key, time) {
			if (!this.checkKey(key)) {
				throw new Error('key is not right.');
			}

			if (!this.data[key]) {
				this.regLock(key);
			}
			var lockData = this.data[key];
			lockData.lock = true;
			time = parseInt(time);
			time = time ? (time < 0 ? -1 : time) : -1;
			if (time !== -1) {
				lockData.time = time;
				lockData.thread = setTimeout(function() {
					lockData.lock = false;
					lockData.time = -1;
					lockData.thread = null;
				}, time * 1000);
			}
		},
		unlock : function(key) {
			if (!this.checkKey(key)) {
				throw new Error('key is not right.');
			}
			var data = this.data[key];
			if (!data)
				return;
			if (data.thread) {
				clearTimeout(data.thread);
				data.lock = false;
				data.time = -1;
				data.thread = null;
			}
		},
		isLocked : function(key) {
			if (!this.checkKey(key)) {
				throw new Error('key is not right.');
			}
			var data = this.data[key];
			return data ? (data.lock) : false;
		},
	};
	// jsLock end

	// printf start
	developMode = {
		debugMode : true,
		traceMode : true
	};
	feng.utils.printf = function() {
		if (window.developMode && window.developMode.debugMode && window.console) {

			var print = function() {
				var msg = arguments[0];
				var dateStr = new Date().toLocaleTimeString();
				switch (typeof msg) {
					case 'object':
						console.info(dateStr + '  %o', msg);
						break;
					default:
						console.info(dateStr + '  ' + msg);
				}
			};

			if (arguments.length > 1) {
				if (console.group) {
					console.group(new Date().toString());
					for (var i = 0, lng = arguments.length; i < lng; i++) {
						print(arguments[i]);
					}
					if (window.developMode && window.developMode.traceMode) {
						console.trace();
					}
					console.groupEnd();
				} else {
					for (var i = 0, lng = arguments.length; i < lng; i++) {
						print(arguments[i]);
					}
					if (window.developMode && window.developMode.traceMode) {
						console.trace();
					}
				}
			} else {
				print(arguments[0]);
				if (window.developMode && window.developMode.traceMode) {
					console.trace();
				}
			}
		}
	};
	// printf start

	// 获取原型链
	feng.utils.getPrototypeOf = function(object) {
		var result = [];
		result.push(object);
		while ( object = Object.getPrototypeOf(object)) {
			result.push(object);
		}
		result.push(null);
		return result;
	};

	// 打印原型链
	feng.utils.printPrototypeTree = function(obj) {
		var result = new Array(0);
		var info = "[";
		if ( obj instanceof Object) {
			for ( obj = Object.getPrototypeOf(obj); obj; obj = Object.getPrototypeOf(obj)) {
				result.unshift(obj);
				info += "%o, ";
			}
		}
		if (result.length) {
			info = info.substring(0, info.length - 2) + ']';
		} else {
			info = info + ']';
		}

		result.unshift(info);
		console.log.apply(console, result);
		// 核心代码
	};

	// 事件处理，兼容所有浏览器
	/**
	 * FireFox, Chrome, Opera, Safari, IE(>=9) 均支持标准的 DOM EVENT MODEL
	 * IE(<=8) 只支持bubble EVENT MODEL
	 *
	 */
	feng.utils.event = {
		addListener : function(element, event, listener, useCapture) {
			if (element.addEventListener) {
				element.addEventListener(event, listener, useCapture);
			} else if (element.attachEvent) {
				element.attachEvent('on' + event, listener);
			} else if (element.setAttribute) {
				element.setAttribute('on' + event, 'listener');
			}
		},
		removeListener : function() {
			if (element.removeEventListener) {
				element.removeEventListener(event, listener, useCapture);
			} else if (element.dettachEvent) {
				element.dettachEvent('on' + event, listener);
			} else if (element.removeAttribute) {
				element.removeAttribute('on' + event);
			}
		},
		stopPropagation : function() {
			if (event || event.stopPropagation) {
				event.stopPropagation();
			} else {
				window.event.cancelBubble = true;
			}
		},
		preventDefault : function() {
			if (event || event.preventDefault) {
				event.preventDefault();
			} else {
				window.event.returnValue = false;
			}
		}
	};

	// 浏览器检测

	feng.utils.client = (function() {
		var userAgent = navigator.userAgent;

		/** 呈现引擎 */
		var engine = {
			ie : 0,
			gecko : 0,
			webkit : 0,
			khtml : 0,
			opera : 0,
			ver : null
		};

		var browse = {
			ie : 0,
			firefox : 0,
			chrome : 0,
			opera : 0,
			safari : 0,
			konqueror : 0,
			ver : null
		};

		var platform = {
			win : /win/i.test(userAgent),
			mac : /mac/i.test(userAgent),
			x11 : /x11/i.test(userAgent) || /linux/i.test(userAgent)
		};

		//显示引擎
		if (window.opera) {
			engine.ver = window.opera.version();
			engine.opera = parseFloat(engine.ver);
		} else if (/AppleWebKit\/(\S+)/.test(userAgent)) {
			engine.ver = RegExp.$1;
			engine.webkit = parseFloat(engine.ver);
		} else if (/KHTML\/(\S+)/.test(userAgent) || /Konqueror\/([^;]+)/.test(userAgent)) {
			engine.ver = RegExp.$1;
			engine.khtml = parseFloat(engine.ver);
		} else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(userAgent)) {
			engine.ver = RegExp.$1;
			engine.gecko = parseFloat(engine.ver);
		} else if (/Trident\/([^;]+)/.test(userAgent)) {
			engine.ver = RegExp.$1;
			engine.ie = parseFloat(engine.ver);
		}

		//浏览器
		switch (true) {
			case /AppleWebKit.*Version\/(\S+)/.test(userAgent) :
				//safari
				browse.ver = RegExp.$1;
				browse.safari = parseFloat(RegExp.$1);
				break;
			case /Gecko.*Firefox\/(\S+)/.test(userAgent) :
				//firefox
				browse.ver = RegExp.$1;
				browse.firefox = parseFloat(RegExp.$1);
				break;
			case /AppleWebKit.*OPR\/(\S+)/.test(userAgent) :
				//opera
				browse.ver = RegExp.$1;
				browse.opera = parseFloat(RegExp.$1);
				break;
			case /AppleWebKit.*Chrome\/(\S+)/.test(userAgent) :
				//chrome
				browse.ver = RegExp.$1;
				browse.chrome = parseFloat(RegExp.$1);
				break;
			case /MSIE ([^;]+)/.test(userAgent) :
				//ie<=10
				browse.ver = RegExp.$1;
				browse.ie = parseFloat(RegExp.$1);
				break;
			case /Trident.*rv:(\S+)\)/.test(userAgent) :
				// ie=edge
				browse.ver = RegExp.$1;
				browse.ie = parseFloat(RegExp.$1);
				break;
		}

		return {
			engine : engine,
			browse : browse,
			platfomr : platform
		};
	})();
	window.feng = feng;

})();
