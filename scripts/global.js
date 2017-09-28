/**
*	Global JS stuff, like map management, navbar functions.
*/

function Global() {}

Global.initAllMaps = function(){
	EventInfo.initMap();
	EventFilters.initMap();
	CreateEvent.initMap();
}

/**
 * Parses the url.
 */
Global.parseUrl = function(){
	var url = document.location.href;

	if (/event\//.test(url)) {
		//	View event
		var eventId = url.match(/event\/(.*?)(\/|$)/);
		if (eventId && eventId.length > 1) {
			Frontpage.initEventInfo(eventId[1]);
		}

	} else {

	}
}

$(function(){
	$('#header_login').click(function(){
		if (User.isSignedIn()){
			//	Signed in; view profile
			GUI.changeLayout($('#profile_page'));
		} else {
			//	Show sign-in dialog
			ModalDialog.show($('#login_dialog'));
		}
	});

	//	Textareas which grows with scroll increase
	$('textarea.auto_grow').on('input', function(){
		this.style.height = 'auto';

		//	Offset hides scrollbar
		this.style.height = (this.scrollHeight + 4) + 'px';
	});

	Global.parseUrl();
});

/**
 * Utilities.
 */
function Utils(){}

/**
 * Zero-fills a number to two integers.
 */
Utils.zeroFill = function(src){
	var str = "" + src;

	return str.length < 2 ? '0' + str : str;
}