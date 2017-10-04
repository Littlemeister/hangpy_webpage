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

	} else if (/create(\/?)/.test(url)) {
		GUI.changeLayout($('#create_event_page'));
	} else if (/me(\/?)/.test(url)) {
		//	View own profile
		GUI.changeLayout($('#profile_page'));
	} else if (/user(\/?)/.test(url)) {
		//	View user details
		
		var userId = url.match(/user\/(.*?)(\/|$)/);
		if (userId && userId.length > 1) {
			UserDetailsDialog.fetchAndShow(userId[1]);
		}
	}
}

Global.initNavbar = function(){
	$('#home_nav').click(function(){
		//	Navigate to frontpage
		GUI.changeLayout($('#frontpage_page'));
	});
}

$(function(){
	$('#header_login').click(function(){
		if (User.isSignedIn()){
			//	Signed in; view profile
			GUI.changeLayout($('#profile_page'));
		} else {
			//	Show sign-in dialog
			ModalDialog.show($('#sign_in_dialog'));
		}
	});

	//	Textareas which grows with scroll increase
	$('textarea.auto_grow').on('input', function(){
		this.style.height = 'auto';

		//	Offset hides scrollbar
		this.style.height = (this.scrollHeight + 4) + 'px';
	});
	Global.initNavbar();

	Global.parseUrl();

	setTimeout(function() {
		//	Hide document loading, executed lastly
		$('#document_loading').addClass('hiding').on('webkitTransitionEnd transitionend', function(){
			$(this).remove();
		});
	}, 5);
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

/**
 * Converts a data URI to a blob.
 * https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
 */
Utils.uriToBlob = function(dataURI){
	// convert base64/URLEncoded data component to raw binary data held in a string
	var byteString;
	if (dataURI.split(',')[0].indexOf('base64') >= 0){
		byteString = atob(dataURI.split(',')[1]);
	}
	else {
		byteString = unescape(dataURI.split(',')[1]);
	}

	// separate out the mime component
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	// write the bytes of the string to a typed array
	var ia = new Uint8Array(byteString.length);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	return new Blob([ia], {type:mimeString});
}

/* Returns the language dependent quantity suffix for a quantity. */
Utils.quantitySuffix = function(quantity){
	let strs = Strings.quantitySuffix;
	return strs['_' + quantity] || strs['other'];
}