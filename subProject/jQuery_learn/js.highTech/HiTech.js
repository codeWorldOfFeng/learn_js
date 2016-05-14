/**
 * @author feng_Pc
 */

// 域安全的构造函数
(function() {
	// 非域安全的构造函数
	function Person(name) {
		this.name = name;
	}

	var p = new Person('feng');
	var p2 = Person('zhang');

	//域安全的构造函数
	function PersonSafe(name) {
		if (this instanceof PersonSafe) {
			this.name = name;
		} else {
			return new PersonSafe(name);
		}
	}

	var p3 = new PersonSafe('safe');
	var p4 = PersonSafe('safe2');

	function Student(name, id) {
		if (this instanceof Student) {
			//这里若无原型继承时会有问题
			PersonSafe.call(this, name);
			this.id = id;
		} else {
			return new Student(name, id);
		}
	}


	Student.prototype = Object.create(PersonSafe.prototype);
	Student.prototype.constructor = Student;

	var s1 = new Student('zhang', 2007);

	// console.trace();
})();

// 惰性初始化
(function() {
	var printf = feng.utils.printf;
	var client = feng.utils.client.browse;
	function printClient() {
		if (client.firefox) {
			printf("Firefox");
		} else if (client.ie) {
			printf('IE');
		} else if (client.chrome) {
			printf('Chrome');
		} else {
			printf('Unrecognized');
		}
	}

	// printClient();

	// 惰性载入函数
	function printClientLazyInit() {
		if (client.firefox) {
			printClientLazyInit = function() {
				printf("Firefox");
			};
		} else if (client.ie) {
			printClientLazyInit = function() {
				printf("IE");
			};
		} else if (client.chrome) {
			printClientLazyInit = function() {
				printf("Chrome");
			};
		} else {
			printClientLazyInit = function() {
				printf("Unrecognized");
			};
		}

		return printClientLazyInit();
	}

	// printClientLazyInit();
	// printClientLazyInit();

})();

// 函数绑定
(function() {
	var environment = {
		name : 'feng',
		print : function(data) {
			console.log(this.name + ': ' + data);
		}
	};

	// 模拟Function.prototype.bind 函数
	Function.prototype.bind = function(context) {
		var slice = Array.prototype.slice;
		var args = slice.call(arguments, 1);
		var fn = this;
		return function() {
			var fnArgs = slice.call(arguments);
			var finalArgs = args.concat(fnArgs);
			return fn.apply(context, finalArgs);
		};
	};

	var environment2 = {};
	environment2.print = environment.print;
	environment2.print(18);
	environment2.print2 = bind(environment.print, environment);
	environment2.print2(18);
	
	environment2.print3 = environment.print.bind(environment, 55);
	environment2.print3(28);

	function bind(fn, context) {
		return function() {
			return fn.apply(context, arguments);
		};
	};
	
	console.info(bind.toSource());
})();


// 函数节流
(function(){
	
	function throttle(fn, context, interval) {
		interval = parseInt(interval);
		interval = interval?interval*1000:1000;
		clearTimeout(fn.tId);
		fn.tId = setTimeout(function() {
			fn.call(context);
		}, interval);
	}
})();

// 观察者模式
(function(){
	function EventTarget() {
		if (this instanceof EventTarget) {
			this.handlers = {};
		} else {
			return new EventTarget();
		}
		
	}
	EventTarget.prototype = {
		constructor : EventTarget,
		addEventListener : function(eventType, handler) {
			var handlers = this.handlers;
			if (!handlers[eventType]) {
				handlers[eventType] = [];
			}
			handlers[eventType].push(handler);
		},
		removeEventListener : function(eventType, handler) {
			var handlers = this.handlers[eventType];
			if (handlers instanceof Array) {
				for (var index = 0, item; item = handlers[index]; index++){
					if (item === handler){
						handlers.splice(index, 1);
						return;
					}
				}
			}
		},
		fire : function(event) {
			if (!event.target) {
				event.target = this;
			}
			var handlers = this.handlers[event.type];
			if (handlers instanceof Array) {
				handlers.forEach(function(data, index, array){
					// data(event);
					data.call(event.target, event);
				});
			}
		} 
	};
	var target = new EventTarget();
	var hello = function(){
		console.log(arguments[0]);
		console.info("Hello World");
	};
	target.addEventListener('click', hello);
	
	target.fire({
		target : target,
		type : 'click'
	});
	
	target.removeEventListener('click', hello);
	console.trace();
})();
