/**
*   USER
*
*   Functions for e.g. user functions and data associated with the currently signed in user.
*/

function User(){}

/**
*   Currently signed in user.
*/
User.current = {};

/**
*	Whether currently signed in.
*/
User.isSignedIn = function(){
	return User.current.id !== undefined;
}

/**
*   Parses cookies and attempts sign-in with such data.
*/
User.parseCookies = function(){
    var cookie = document.cookie;
    var user = cookie.match(/user=(.+)&/);
    user = "+46721521129";
    
    var authToken = cookie.match(/auth_token=(.+)&/);
    authToken = "7WyLpDyDhNid1H9MO0ptd1TRN1Qncksj";
    
    if (user && user.length > 1 && authToken.length > 1) {
        //  Has user
        //user = user[1];
        User.current.phoneNumber = user;
        User.current.authToken = authToken;

        User.fetchData();
    } else {
        //  Alter navbar login button
        $('#header_login').text(Strings.signIn);
    }
}

/**
*   Queues a verification code associated with this user.
*/
User.queueVerification = function(phoneNumber, callback) {
    User.current.phoneNumber = phoneNumber;
    
    Backend.request('action=queue_verification', {
        
        phone_num: phoneNumber
        
    }, function(response){
        
        if (response == SUCCESS) {
            callback();
        }
        
    });
}

/**
*   Checks a verification code associated with this user.
*	Provide a callback with a status parameter, can be one of the
*	following: SUCCESS, FAILED, STATUS_SIGN_UP
*/
User.checkVerification = function(code, callback) {
    var user = User.current;
    
    Backend.request('action=check_verification', {
        
        phone_num: user.phoneNumber,
        verif_code: code
        
    }, function(response){
		User.parseCheckVerification(response, callback);
	});
}

/**
*   Parses verification check response.
*/
User.parseCheckVerification = function(response, callback) {
    
    var obj = JSON.parse(response);
    
    if (obj.status == FAILED) {
        //  Failed
		callback(FAILED);
        User.onInvalidVerification();
        return;
    }
    
    //  Correct verification
    var user = User.current;
    user.authToken = obj.auth_token;
    
    $('#_user').html('Respose: ' + response);
    $('#_verif-status').html('Correct verification. Auth token: ' + obj.auth_token);
    
    if (obj.already_signed_up) {
        User.fetchData(callback);
    } else {
        User.onFirstSignIn();
		callback(STATUS_SIGN_UP);
    }
}

User.onInvalidVerification = function(){
    $('#_verif-status').html('Invalid verification');
}

/**
*   Called when user has signed in for the first time and needs
*   to set up profile data.
*/
User.onFirstSignIn = function(){
    $('#_user-data').html("First sign-in, needs to complete profile");
}

/**
*   Update user profile data. Callback is optional.
*
*   Valid data fields are:
*       full_name : User's full name. May only be set once.
*/
User.updateProfile = function(dirtyData, callback) {
    Backend.request('action=update_data', dirtyData, callback);
}

/**
*   Fetches user-specific data. Leave userId undefined to fetch own user data.
*/
User.fetchData = function(verificationCallback) {
    Backend.request('out=user_data', null, function(response){
		User.parseData(response, verificationCallback);
	});
}

User.parseData = function(response, verificationCallback) {
    console.log("Fetch user data response: " + response);

    var obj = JSON.parse(response);
	
	console.log(obj);
	
    obj.first_name = obj.name.match(/^([\w]+)/)[0];

    //  Update navbar
    $('#header_login').html(Strings.userNavProfile.replace('$', obj.first_name)).addClass('signed_in');
    
    $.extend(User.current, obj);
    
    Profile.setupElements();
	
	verificationCallback(SUCCESS);
    
    $('#_user-data').html("User data: " + response);
}

/**
*   Fetches user-specific data. Will contain less data than own user data.
*/
User.fetchDataById = function(userId) {
    Backend.request('out=user_data&user_id=' + userId, null, function(response){
        User.parseDataById(response, userId);
    });
}

User.parseDataById = function(response, userId) {
    var obj = JSON.parse(response);
    
    $('#_user-data-id-status').html("User data: " + response);
}


/**
*   Fetches the user's "My events".
*/
User.fetchMyEvents = function() {
    Backend.request('out=my_events', null, User.parseMyEvents);
}

User.parseMyEvents = function(response) {
    var obj = JSON.parse(response);
    
    var events = obj.events;
    User.convertMyEventsToHtml(events);
}

User.setCookies = function(){
    let user = User.current;
    
    let cookieExpire = "expires=Thu, 01 Jan 2099 12:00:00 UTC";
    document.cookie = "user=" + user.phoneNumber + ';' + cookieExpire;
    document.cookie = "auth_token=" + user.authToken + ';' + cookieExpire;
}

User.parseCookies();

/**
*   Requests to delete the user's account. Does NOT ask for confimation.
*   The profile won't get immediately deleted but rather temporarily removed, then deleted.
*/
User.deleteAccount = function(){
    GUI.showFullscreenLoading();

    Backend.request('action=delete_account', null, function(response){
        User.onDeletedAccount();
    });
}

/**
*   Called once the user has "deleted" their account.
*/
User.onDeletedAccount = function(){
    User.onSignedOut();
}

/**
*   Clears user-specific cookies and signs out.
*/
User.signOut = function(){
    GUI.showFullscreenLoading();
    
    Backend.request('action=sign_out', null, function(response){
        User.onSignedOut();
    });
}

/**
*   Called once the user has signed out.
*/
User.onSignedOut = function(){
    User.current = {};

    //  Clear cookies
    let expires = 'Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'user=;expires=' + expires;
    document.cookie = 'auth_token=;expires=' + expires;
    
    GUI.hideFullscreenLoading();

    $('#header_login').text(Strings.signIn);
    GUI.changeLayout($('#frontpage_page'));
}