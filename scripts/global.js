/**
*	Global JS stuff, like map management, navbar functions.
*/

function Global() {}

Global.initAllMaps = function(){
	EventInfo.initMap();
	EventFilters.initMap();
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
});