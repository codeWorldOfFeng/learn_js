/**
 * @author feng_Pc
 */

(function() {
	var person;
	var name = person && person.getName();
	var type = typeof name;
	if (name) {
		printf("true");
	}
	
	person = null;
	name = person && person.getName();
	type = typeof name;
	if (name) {
		printf("true");
	}
	
	person = false;
	name = person && person.getName();
	type = typeof name;
	if (name) {
		printf("true");
	}
	
	person = 0 ;
	name = person && person.getName();
	type = typeof name;
	if (name) {
		printf("true");
	}
	
	person = "";
	name = person && person.getName();
	type = typeof name;
	if (name) {
		printf("true");
	}
	
	person = 1;
	name = person && "feng";
	type = typeof name;
	
	person = 1;
	name = person && null;
	type = typeof name;
	
	person = 1;
	name = person && undefined;
	type = typeof name;
	
	person = 1;
	name = person && false;
	type = typeof name;
	
	person = 1;
	name = person && true;
	type = typeof name;
})();


(function() {
	var expOne, expTwo;
	var test = function() {
		var result = expOne || expTwo;
		var type = typeof result;
		if (result) {
			printf(true);
		}
	};
	test();
	expOne = 2;		//true;
	test();	
	expOne = "";	//false;
	expTwo = null;
	test();
})();



