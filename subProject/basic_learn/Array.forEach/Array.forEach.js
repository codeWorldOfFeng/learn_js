/**
 * @author feng_Pc
 */

(function() {
	Array.prototype.foreach = function(fn, thisObj) {
		var scope = thisObj || window;
		for (var i = 0, lng = this.length; i < lng; i++) {
			fn.call(scope, this[i], i, this);
		}
	};
	var array = [1, 2, 3, 4, 5];
	var callback = function(data, index, array) {
		console.info(data);
	};
	array.forEach(callback);
	array.foreach(callback);
})();
