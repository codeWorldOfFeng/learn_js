/**
 * @author feng_Pc
 */

(function() {
	function foo() {
		var a = 10;
		function baz() {
			a *= 2;
			return a;
		}

		return baz;
	}

	var aa = foo();
	aa();
	aa();

	var bb = foo();
	bb();
	console.info("Hello World");
})();

(function() {
	function Person(name) {
		return {
			getName : function() {
				return name;
			},
			setName : function() {
				name = arguments[0] ? arguments[0] : '';
			}
		};
	}

	var p1 = new Person('feng');
	var temp = p1.getName();
	p1.setName("zhangfeng");
	temp = p1.getName();
})();

(function() {
	function Person(name) {
		this.getName = function() {
			return name;
		};
		this.setName = function() {
			name = arguments[0] ? arguments[0] : '';
		};
	}

	var p1 = new Person('feng');
	var temp = p1.getName();
	p1.setName("zhangfeng");
	temp = p1.getName();
})();

(function() {
	var utils = feng.utils;
	var Interface = utils.Interface;
	var PersonI = new Interface('PersonI', ['getName', 'setName']);
	var Person = function() {
		var hairColor = 'black';
		var checkName = function(name) {
			if (!name) {
				utils.printf('person.name must not be null!');
			}
		};
		return function(name) {
			this.getName = function() {
				return name;
			};
			this.setName = function() {
				checkName(arguments[0]);
				name = arguments[0];
			};
		};
	}();
	Person.getHairColor = function() {
		return hairColor;
	};

	var p1 = new Person('feng');
	Interface.ensureImplements(p1, PersonI);
	var temp = p1.getName();
	p1.setName("zhangfeng");
	p1.setName('');
	temp = p1.getName();

	//temp = Person.getHairColor();
})();


(function() {
	var utils = feng.utils;
	var constants = function() {
		var privateMap = {};
		
		return {
			init : function(obj) {
				utils.extend(privateMap, obj);
			},
			get : function(key) {
				return privateMap[key];
			}
		};
	}();
	
	constants.init({
		name : 'feng',
		age : 25
	});
	var temp = constants.get('name');
})();


//常量对象 初始化之后不可以更改
(function() {
	var utils = feng.utils;
	var Constants = function(obj) {
		var privateMap = {};
		utils.extend(privateMap, obj);
		this.get = function(key) {
			return privateMap[key];
		};
	};
	
	var myConstants = new Constants({
		name : 'feng',
		age : 25
	});
	var temp = myConstants.get('name');
})();


(function() {
	var Person = function() {
		var constants = {
			eyeNum : 2,
			legNum : 2
		};
		var getConstant = function(key) {
			return constants[key];
		};
		
		var constructor = function(name) {
			this.getName = function() {
				return name;
			};
			this.setName = function() {
				name = arguments[0];
			};
			this.getConstant = getConstant;
		};
		constructor.getConstant = getConstant;
		return constructor;
	}();
	
	var p1 = new Person('zhang');
	var temp = Person.getConstant('legNum');
	temp = p1.getConstant('eyeNum');
})();
