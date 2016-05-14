/**
 * @author feng_Pc
 */
(function() {
	var Counter = (function() {
		var privateCounter = 0;
		function changeBy(val) {
			privateCounter += val;
		}

		return {
			value : function() {
				return privateCounter;
			},
			increment : function() {
				changeBy(1);
			},
			decrement : function() {
				changeBy(-1);
			}
		};
	})();

	console.info(Counter.value());

	Counter.increment();
	console.info(Counter.value());

	Counter.increment();
	Counter.increment();
	console.info(Counter.value());

	Counter.decrement();
	console.info(Counter.value());
})();
