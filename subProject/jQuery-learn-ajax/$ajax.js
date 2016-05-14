/**
 * @author feng_Pc
 */

/**
 * 
 * $('body').load(url [,data] [,callback]);
 * 
 * $.get(url [,data] [,success] [dataTye])
 * 
 */


/**
 * 	$.get(url [,data] [,success] [dataTye]);
 	$.post( url [, data ] [, success ] [, dataType ] );
 	$.ajax({
 		url : url,
 		type : 'get',
 		data : data,
 		dataType : dataType,
 		success : success
 	});
    url
    Type: String
    A string containing the URL to which the request is sent.
    
    data
    Type: PlainObject or String
    A plain object or string that is sent to the server with the request.
    
    success
    Type: Function( PlainObject data, String textStatus, jqXHR jqXHR )
    A callback function that is executed if the request succeeds. Required if dataType is provided, but you can use null or jQuery.noop as a placeholder.
    
    dataType
    Type: String
    The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
 */

/**
 * 为ajax设置默认值
 */
$.ajaxSetup({
	method : 'get',
	timeout : 5*1000,
	
	processData : true, //把data对象 序列化成 urlencoded 字符串
	
	contentType : 'application/x-www-form-urlencoded; charset=utf-8',
	headers : {
		"X-Requested-With" : 'XMLHttpRequest'
	},
	beforeSend : function(jqXHR, setting) {
		
	},
	complete : function(jqXHR, statusText) {
		
	},
	
	async : true, 
	cache : true, 
	
	traditional : false, 
	
	statusCode : {
		404 : function() {
			
		},
		302 : function() {
			
		},
		501 : function() {
			
		}
	}
	
});

$.ajax({
	url : 'url',
	method : 'post', // 'post', 'get', 'put'
	type : 'post',	//'post','get' default 'get' oldway
	data : {},		// PlainObject or String
	dataType : 'json', // The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
	success : function(data, textStatus, jqXHR) {},
	error : function(jqXHR, textStatus, errorThrown) {}, // textStatus : null, "timeout", "error", "abort", and "parsererror"
														 // errorThrown : When an HTTP error occurs, errorThrown receives the textual portion of the HTTP status, such as "Not Found" or "Internal Server Error."
	headers : {
		"X-Requested-With" : 'XMLHttpRequest'
	},
	timeout : 20*1000,
	beforeSennd : function(jqXHR, setting) {}, // Use this to set custom headers
	complete : function(jqXHR, statusText) {}, // will always run
	contentType : 'application/x-www-form-urlencoded; charset=utf-8', // false to remove contentType from headers
																	  // multipart/form-data ,text/plain etc.
	
	processData : true, // set false if you want to prevent transport data to string.
	mimeType : 'text/html;charset=gbk', //A mime type to override the XHR mime type.
	
	
	username : 'username',
	password : 'password',
	
	async : true, 
	cache : true, //  false for dataType 'script' and 'jsonp
	context : document.body, // all ajax callback will use context for this.
	traditional : false, // don't change it's default value ,
	
	statusCode : {
		404 : function() {
			
		},
		302 : function() {
			
		},
		501 : function() {
			
		}
	}
});
