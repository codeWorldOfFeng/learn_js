var client = function() {

	var userAgent = navigator.userAgent;

	/** 呈现引擎 */
	var engine = {
		ie : 0,
		gecko : 0,
		webkit : 0,
		khtml : 0,
		opera : 0,
		ver : null
	};

	var browse = {
		ie : 0,
		firefox : 0,
		chrome : 0,
		opera : 0,
		safari : 0,
		konqueror : 0,
		ver : null
	};

	var platform = {
		win : /win/i.test(userAgent),
		mac : /mac/i.test(userAgent),
		x11 : /x11/i.test(userAgent) || /linux/i.test(userAgent)
	};

	//显示引擎
	if (window.opera) {
		engine.ver = window.opera.version();
		engine.opera = parseFloat(engine.ver);
	} else if (/AppleWebKit\/(\S+)/.test(userAgent)) {
		engine.ver = RegExp.$1;
		engine.webkit = parseFloat(engine.ver);
	} else if (/KHTML\/(\S+)/.test(userAgent) || /Konqueror\/([^;]+)/.test(userAgent)) {
		engine.ver = RegExp.$1;
		engine.khtml = parseFloat(engine.ver);
	} else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(userAgent)) {
		engine.ver = RegExp.$1;
		engine.gecko = parseFloat(engine.ver);
	} else if (/Trident\/([^;]+)/.test(userAgent)) {
		engine.ver = RegExp.$1;
		engine.ie = parseFloat(engine.ver);
	}

	//浏览器
	switch (true) {
		case /AppleWebKit.*Version\/(\S+)/.test(userAgent) :
			//safari
			browse.ver = RegExp.$1;
			browse.safari = parseFloat(RegExp.$1);
			break;
		case /Gecko.*Firefox\/(\S+)/.test(userAgent) :
			//firefox
			browse.ver = RegExp.$1;
			browse.firefox = parseFloat(RegExp.$1);
			break;
		case /AppleWebKit.*OPR\/(\S+)/.test(userAgent) :
			//opera
			browse.ver = RegExp.$1;
			browse.opera = parseFloat(RegExp.$1);
			break;
		case /AppleWebKit.*Chrome\/(\S+)/.test(userAgent) :
			//chrome
			browse.ver = RegExp.$1;
			browse.chrome = parseFloat(RegExp.$1);
			break;
		case /MSIE ([^;]+)/.test(userAgent) :
			//ie<=10
			browse.ver = RegExp.$1;
			browse.ie = parseFloat(RegExp.$1);
			break;
		case /Trident.*rv:(\S+)\)/.test(userAgent) :
			// ie=edge
			browse.ver = RegExp.$1;
			browse.ie = parseFloat(RegExp.$1);
			break;
	}

	return {
		engine : engine,
		browse : browse,
		platfomr : platform
	};
};
