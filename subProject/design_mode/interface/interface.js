/**
 * @author feng_Pc
 */

(function() {

	var utils = feng.utils;
	var Interface = utils.Interface;

	var MeetingService = new Interface('MeetingService', ['add', 'del', 'get', 'update']);

	function MeetingServiceImpl() {// implements MeetingService
		//Interface.ensureImplements(MeetingServiceImpl, MeetingService);
	}

	/*
	MeetingServiceImpl.prototype.update = function() {

	};
	*/
	function MeetingServiceBaseImpl() {

	};

	MeetingServiceBaseImpl.prototype = {
		constructor : MeetingServiceBaseImpl,
		add : function() {

		},
		del : function() {

		},
		get : function() {

		}
	};

	utils.extendsClass(MeetingServiceImpl, MeetingServiceBaseImpl);
	//MeetingServiceImpl.prototype = Object.create(MeetingServiceBaseImpl.prototype);

	var service = new MeetingServiceImpl();
	//service.update = function(){};
	Interface.ensureImplements(service, MeetingService);

})();
