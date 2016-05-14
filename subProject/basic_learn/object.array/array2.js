/**
 * @author feng_Pc
 */

(function() {
	var array = [1, 4, 10, false, "Hello world", undefined, null, {}, /abc+/ig,
	function() {
	}, []];
	array.objIndex = "feng";
	for (index in array) {
		printf(index);
		printf(array[index]);
	}
	for (var i = 0; i < array.length; i++) {
		printf(array[i]);
	}
	for (var i = 0, len = array.length; i < len; i++) {
		printf(array[i]);
	}
	for (var i = 0, item; item = array[i++]; ) {
		printf(item);
	}
	
})();


(function() {
	var array = [1, 4, 10, false, "Hello world", undefined, null, {}, /abc+/ig,
	function() {
	}, []];
	
})();
