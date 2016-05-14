/**
 * @author feng_Pc
 */

(function() {
	var feng = window.feng || {};
	feng.singleton = {
		attr1 : 'Hello World',
		attr2 : 10,
		fn1 : function() {
			
		},
		fn2 : function() {
			
		}
	};
	
	
	
	// 单例 只会被实例化一次 加载脚本时初始化
	feng.singleton2 = (function() {
		var privateAttr1 = 'private Hello World';
		function privateMethod() {};
		
		return {
			attr1 : 'Hello World',
			attr2 : 10,
			fn1 : function() {
				
			},
			fn2 : function() {
				
			}
		};
	})();
	
	// 单例 只会被实例化一次 惰性初始化
	feng.singleton3 = (function() {
		var singleton;
		function construtor() {
			var privateAttr1 = 'private Hello World';
			function privateMethod() {};
			
			return {
				attr1 : 'Hello World',
				attr2 : 10,
				fn1 : function() {
					
				},
				fn2 : function() {
					
				}
			};
		}
		
		return {
			getInstance : function() {
				if (!singleton) {
					singleton = constructor();
				}
				return singleton;
			}
		};
		
	})();
	
	var singletonTemp = feng.singleton3.getInstance();
	
})();
