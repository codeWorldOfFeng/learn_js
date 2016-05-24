
(function() {
	var obj = {
		init : function() {
			console.info(this);	
			var initData = function(that) {
				console.info(that);
				console.info(this);
			};
			initData();
		}
	};
	obj.init();
	console.info(this);
})();
