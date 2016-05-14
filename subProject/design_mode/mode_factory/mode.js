/**
 * @author feng_Pc
 */

(function() {
	var $ = feng.utils;
	var Bicycle = new $.Interface('Bicycle', ['runTest']);
	function BicycleShop() {

	};
	function BicycleBaseModel() {

	}


	$.extend(BicycleBaseModel.prototype, {
		runTest : function() {

		}
	});

	function BicycleModel1() {

	}

	function BicycleModel2() {

	}


	$.extendsClass(BicycleModel1, BicycleBaseModel);
	$.extend(BicycleShop.prototype, {
		sell : function(model) {
			var bicycle;
			switch (model) {
				case 'model1' :
					bicycle = new BicycleModel1();
					break;
				case 'model2' :
					bicycle = new BicycleModel2();
					break;
				case 'model3' :
					bicyle = new BicycleModel3();
					break;
			}
			$.Interface.ensureImplements(bicycle, Bicycle);
			bicycle.runTest();
			return bicycle;
		}
	});

	var shop = new BicycleShop();
	shop.sell('model1');
	//shop.sell('model2');
})();

(function() {
	var F = feng.utils;
	var Interface = F.Interface;
	var Bicycle = new Interface('Bicycle', ['runTest']);

	function BicycleBaseModel() {

	}

	F.extend(BicycleBaseModel.prototype, {
		runTest : function() {

		}
	});
	function BicycleModel1() {

	}

	function BicycleModel2() {

	}

	function BicycleModel3() {

	}
	F.extendsClass(BicycleModel1, BicycleBaseModel);
	F.extendsClass(BicycleModel2, BicycleBaseModel);
	F.extendsClass(BicycleModel3, BicycleBaseModel);
	
	(function() {
		function BicycleShop() {

		}
		F.extend(BicycleShop.prototype, {
			sell : function(model) {
				var bicycle = BicycleFactory.create(model);
				bicycle.runTest();
				return bicycle;
			}
		});

		var BicycleFactory = {
			create : function(model) {
				var bicycle;
				switch (model) {
					case 'model1' :
						bicycle = new BicycleModel1();
						break;
					case 'model2' :
						bicycle = new BicycleModel2();
						break;
					case 'model3' :
						bicyle = new BicycleModel3();
						break;
				}

				Interface.ensureImplements(bicycle, Bicycle);
				return bicycle;
			}
		};
		var shop = new BicycleShop();
		shop.sell('model1');
		shop.sell('model2');
		
	})();

})();
