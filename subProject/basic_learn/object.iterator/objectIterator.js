/**
 * @author feng_Pc
 */

(function() {
	var utils = feng.utils;

	/*
	 var str = new String("Hello");
	 check(str);
	 check(String);
	 check(String.prototype);
	 */

	function Person(name) {
		if (this instanceof Person) {
			this.name = name;
		} else {
			return new Person(name);
		}
	}

	function Student(name, id) {
		if (this instanceof Student) {
			Student.super.constructor.call(this, name);
			this.id = id;
		} else {
			return new Student(name, id);
		}
	}


	Student.prototype = {
		named : 'Student.prototype',
		add : function() {

		},
		update : function() {

		}
	};

	utils.extendsClass(Student, Person);
	var stu = new Student('feng', 15556165);
	Object.defineProperty(stu, 'dddd', {
		value : 'Hello',

	});

	function checkIn(object) {
		for (property in object) {
			utils.printf('%o[%s] = %o', object, property, object[property]);
		}
	}
	//Object.keys() 方法会返回一个由给定对象（不包括原型链）的所有可枚举属性的属性名组成的数组
	var properties = Object.keys(stu);
	var properties2 = [];
	//for-in 遍历一个对象以及从其原型链上继承到的可枚举属性
	for (p in stu) {
		properties2.push(p);
	}
	//指定对象的所有自身属性的属性名（包括不可枚举属性）组成的数组
	var properties3 = Object.getOwnPropertyNames(stu);
	
	/*
	var proto = Student.prototype;
	var properties4 = Object.getOwnPropertyNames(proto);
	var properties5 = Object.keys(proto);
	var properties6 = properties4.filter(function(data, index, array) {
		if (properties5.indexOf(data) === -1) {
			return true;
		} else {
			return false;
		}
	});
	var t1 = proto.hasOwnProperty(properties6[0]);
	var t2 = properties6[0] in proto;
	*/
	var stu_self_all = utils.getProperties(stu, true, false, 2);
	var stu_self_enumerable = utils.getProperties(stu, true, false, 1);
	var stu_self_non_enumerable = utils.getProperties(stu, true, false, 0);
	
	var stu_proto_all = utils.getProperties(stu, false, true, 2);
	var stu_proto_enumerable = utils.getProperties(stu, false, true, 1);
	var stu_proto_non_enumerable = utils.getProperties(stu, false, true, 0);
	
	var stu_all = utils.getProperties(stu, true, true, 2);
	var stu_enumerable = utils.getProperties(stu, true, true, 1);
	var stu_non_enumerable = utils.getProperties(stu, true, true, 0);
	
	utils.printPrototypeTree(stu);
	checkIn(stu);
	

})();
