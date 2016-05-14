function getRequestArgs() {
	var result = {};
	var args = location.search;
	args = args.length > 0 ? args.substring(1) : "";
	args = args.length > 0 ? args.split('&') : [];
	args.forEach(function(data, index, array) {
		var arg = data.split('=');
		result[decodeURIComponent(arg[0])] = decodeURIComponent(arg[1]);
	});
	return result;
}

var printf = feng.utils.printf;
/**
 * 
 * @param string plugin
 * 
 * @return 0 未安装插件；1 安装了但未启用插件；2 安装并启用了插件
 */
function getPluginStatus(plugin) {
	// plugin 按名字查找
	if ( typeof plugin !== 'string' || !isNaN(+plugin)) {
		return 0;
	}
	if (window.navigator.plugins[plugin] ? true : false) {
		return 2;
	}
	// plugin 按类型查找
	var mimeType = window.navigator.mimeTypes[plugin];
	if (mimeType) {
		if (mimeType.enabledPlugin) {
			return 2;
		}
		return 1;
	}
	return 0;

}
