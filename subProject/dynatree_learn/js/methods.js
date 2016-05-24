/**
 * @author feng_Pc
 */

(function() {
	var $tree = $("#tree");
	var dTree = $tree.dynatree("getTree");  //getTree 
	var rootNode = $tree.dynatree("getRoot");
	var rootNode = dTree.getRootNode();
	var activeNode = $tree.dynatree("getActiveNode");
	var activeNode = dTree.getActiveNode();
	var selectedNodes = $tree.dynatree("getSelectedNodes");
	var selectedNodes = dTree.getSelectedNodes();
})();
