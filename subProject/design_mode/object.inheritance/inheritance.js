/**
 * @author feng_Pc
 */

/**
 * 类继承
 */
function Environment() {
	var utils = feng.utils;
	function Person(name) {
		if (this instanceof Person) {
			this.name = name;
		} else {
			return new Person(name);
		}
	}


	utils.extend(Person.prototype, {
		getName : function() {
			return this.name;
		},
		setName : function(name) {
			this.name = name;
		}
	});
	function Student(name, id) {
		if (this instanceof Student) {
			Student.super.constructor.call(this, name);
			this.id = id;
		} else {
			return new Student(name, id);
		}
	}


	utils.extend(Student.prototype, {
		getId : function() {
			return this.id;
		},
		setId : function(id) {
			this.id = id;
		}
	});
	utils.extendsClass(Student, Person);
}

Environment();

/**
 * 原型式继承
 */
function Environment() {
	function clone(object) {
		var F = function() {
		};
		F.prototype = object;
		return new F();
	}

	var Person = {
		name : 'default name',
		getName : function() {
			return this.name;
		}
	};
	var Student = clone(Person);
	var temp = Student.getName();
	Student.name = 'feng';
	Student.id = 564654;
	temp = Object.create(Person);
}

Environment();

// augment 扩充

(function() {
	function augment(receivingObject, givingObject) {
		var target, propertyName, lng = arguments.length;
		function copyToTarget(target, from, propertyName) {
			var src = from[propertyName];
			var dst = target[propertyName];
			if (src && !dst) {
				target[propertyName] = src;
			}
		}
		if ( receivingObject instanceof Object) {
			target = receivingObject;
			if ( receivingObject instanceof Function) {
				target = receivingObject.prototype;
			}
			if (lng > 2) {
				for (var i = 2; propertyName = arguments[i++]; ) {
					copyToTarget(target, givingObject, propertyName);
				}
			} else {
				for (propertyName in givingObject) {
					copyToTarget(target, givingObject, propertyName);
				}
			}
			return;
		}
		throw new Error("arguments error!");
	}
	var utils = {};
	augment(utils, feng.utils);

})();

