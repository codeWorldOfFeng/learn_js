/**
 * @author feng_Pc
 */
(function() {
	var feng = {};

	feng.utils = feng.utils || {};

	// jsLock start
	
	
	feng.utils.Lock = function() {
		function Lock() {
			this.data = {};
		};
		Lock.prototype = {
			constructor : Lock,
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
		return Lock;
	}();

	// jsLock end

	// printf start
	developMode = {
		debugMode : true,
		traceMode : false
	};
	feng.utils.printf = function() {
		if (window.developMode && window.developMode.debugMode && window.console) {

			if ( typeof arguments[0] === 'string') {
				arguments[0] = new Date().toLocaleTimeString() + ': ' + arguments[0];
				console.log.apply(console, Array.prototype.slice.call(arguments));
				return;
			}

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
			var constructor, className;
			for ( obj = Object.getPrototypeOf(obj); obj; obj = Object.getPrototypeOf(obj)) {
				if (( constructor = obj.constructor) && ( className = constructor.name)) {
					info += '%s:';
					result.push(className);
				}
				info += "%o, ";
				result.push(obj);
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

	// 继承
	feng.utils.extendsClass = function(subClass, superClass) {
		if ( subClass instanceof Function && superClass instanceof Function) {
			var proto = Object.create(superClass.prototype);
			// proto.constructor = subClass;
			Object.defineProperty(proto, 'constructor', {
				value : subClass,
				configurable : true, 	//可配置
				enumerable : false, 	//不可枚举
				writable : true,		//可写

			});
			
			//定义一个指向父类原型的指针
			Object.defineProperty(subClass, 'super', {
				value : superClass.prototype,
				configurable : false, 	//不可配置
				enumerable : false, 	//不可枚举
				writable : false,		//不可写

			});
			
			var oldProto = subClass.prototype;
			for (property in oldProto) {
				proto[property] = oldProto[property];
			}
			subClass.prototype = proto;
		} else {
			throw new Error("wrong arguments!");
		}
	};

	// 对象属性的遍历
	/**
	 *
	 * @param {Object} obj 需要遍历的对象
	 * @param {Object} iteratorSelfBool 是否遍历自己
	 * @param {Object} iteratorProtoBool 是否遍历原型链
	 * @param {Object} enumerableFlag 0=nonEnumerable;1=enumerable;2=all.
	 *
	 * */
	feng.utils.getProperties = function(obj, iteratorSelfBool, iteratorProtoBool, enumerableFlag) {
		var enumerable, props = [];
		switch (parseInt(enumerableFlag)) {
			case NaN :
				enumerable = function(obj, prop) {
					return true;
				};
				break;
			case 0 :
				enumerable = function(obj, prop) {
					return !obj.propertyIsEnumerable(prop);
				};
				break;
			case 1 :
				enumerable = function(obj, prop) {
					return obj.propertyIsEnumerable(prop);
				};
				break;
			default :
				enumerable = function(obj, prop) {
					return true;
				};
		}
		do {
			if (iteratorSelfBool) {
				Object.getOwnPropertyNames(obj).forEach(function(prop, index, array) {
					if (props.indexOf(prop) && enumerable(obj, prop)) {
						props.push(prop);
					}
				});
			}
			if (!iteratorProtoBool) {
				break;
			}
			iteratorSelfBool = true;

		} while (obj = Object.getPrototypeOf(obj));
		return props;
	};

	// 鸭式辨行法
	feng.utils.Interface = function() {
		//Interface
		function Interface(name, methodsArray) {
			if (arguments.length < 2) {
				throw new Error("Arguments Error!");
			}
			this.name = name;
			this.methods = [];
			if ( methodsArray instanceof Array) {
				methodsArray.forEach(function(method, index, array) {
					if ( method instanceof String || typeof method === 'string') {
						this.methods.push(method);
					} else {
						throw new Error("Arguments Error(method args is not a string)!");
					}
				}, this);
			} else {
				throw new Error("Arguments Error!");
			}
		}


		Interface.ensureImplements = function(object) {
			if (arguments.length < 2) {
				throw new Error("Arguments Error!");
			}
			if (!( object instanceof Object)) {
				throw new Error("Arguments Error!");
			}
			var isAFunction = false;
			var checkMethodExistFn = function(method) {
				return object[method] instanceof Function;
			};
			if ( object instanceof Function) {
				isAFunction = true;
				checkMethodExistFn = function(method) {
					return object.prototype[method] instanceof Function;
				};
			}

			var interfaces = Array.prototype.slice.call(arguments, 1);
			interfaces.forEach(function(interface, index, array) {
				if (!( interface instanceof Interface)) {
					throw new Error("Arguments Error(not a Interface)!");
				} else {
					var methods = interface.methods;
					methods.forEach(function(method, index, array) {
						if (checkMethodExistFn(method)) {

						} else {
							var error = "object";
							if (isAFunction) {
								error = "Class(" + object.name + ")";
							}
							throw new Error(error + " does not implements the method(" + method + ') of the interface(' + interface.name + ')');
						}
					});
				}
			});
		};
		return Interface;
	}();

	// 模拟jQuery的$.extend()方法
	feng.utils.extend = function() {

		var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean") {
			deep = target;

			// skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !( target instanceof Function)) {
			target = {};
		}

		// extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if (( options = arguments[i] ) != null) {

				// Extend the base object
				for (name in options ) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (false && deep && copy && (jQuery.isPlainObject(copy) || ( copyIsArray = jQuery.isArray(copy) ) )) {

						if (copyIsArray) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	window.feng = feng;
	window.printf = feng.utils.printf;

})();
