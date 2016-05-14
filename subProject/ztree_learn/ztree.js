/**
 * @author feng_Pc
 */
(function() {
	var zTreeObj;
	var setting = {};
	var zNodes =[
		{
			name : 'test1',
			open : true,
			children : [
				{name : 'test1_1'}, 
				{name : 'test1_2'}
			]
		},{
			name : 'test2',
			children : [
				{name : 'test2_1'}, 
				{name : 'test2_2'}
			]
		}
	];
	$(document).ready(function() {
		zTreeObj = $.fn.zTree.init($('#ztree'), setting, zNodes);
	});
	
})();
