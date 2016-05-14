/**
 * @author feng_Pc
 */
(function() {
	var array = ['red', 2, false, null, undefined, null];
	console.info(array);
	// ["red", 2, false, null, undefined]
	console.info(array.valueOf());
	//  ["red", 2, false, null, undefined]
	console.info(array.toString());
	//red,2,false,,
	console.info(array.join('--'));
	//red--2--false----

	array.length = 10;
	var topdd = array.pop();

	array.push('Hello');

	console.info(array.sort());
	//[2, false, null, null, "red", undefined]
	console.info(array.reverse());
	// [undefined, "red", null, null, false, 2]

	var array2 = [1, 5, 10, 12, 18, 22, 3000, 500, '55d', undefined, null, false];
	console.info(array2.sort());
	// [1, 10, 12, 18, 22, 3000, 5, 500]

	var s2b = function() {
		try {
			var a = +arguments[0];
			var b = +arguments[1];
			return a <= b ? -1 : 1;
		} catch(e) {
			console.info(e);
		}
	};
	array.sort(s2b);
	console.info(array2);
	// [1, 5, 10, 12, 18, 22, 3000, 500, "55d", false, null, undefined]
	var s2b2 = function() {//大到小
		return arguments[1] - arguments[0];
	};
	array2.sort(s2b2);
	console.info(array2);
	// [3000, 500, 22, 18, 12, 10, 5, 1, "55d", false, null, undefined]
	array2.concat();

	function hello() {

	};

	var obj = {};
	hello.call(obj);
})();
