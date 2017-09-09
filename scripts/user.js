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
*   Parses cookies and attempts sign-in with such data.
*/
User.parseCookies = function(){
    var cookie = document.cookie;
    var user = cookie.match(/user=(.+)&/);
    
    if (user && user.length > 1) {
        //  Has user
        user = user[1];
        
        var authToken = cookie.match(/auth_token=(.+)&/);
        
        if (authToken.length > 1){
            User.current.phoneNumber = user;
            User.current.authToken = authToken;
        }
    }
}

/**
*   Fetches user-specific data.
*/
User.fetchData = function() {
    Backend.request('out=user_data');
}

/**
*   Queues a verification code associated with this user.
*/
User.queueVerification = function(phoneNumber) {
    User.current.phoneNumber = phoneNumber;
    
    Backend.request('action=queue_verification', {
        
        phone_num: phoneNumber
        
    }, function(response){
        
        if (response == SUCCESS) {
            onQueuedVerification();
        }
        
    });
}

/**
*   Called once successfully queued verification.
*/
User.onQueuedVerification = function() {
}

/**
*   Checks a verification code associated with this user.
*/
User.checkVerificationCode = function(code) {
    var user = User.current;
    
    Backend.request('action=check_verification', {
        
        phone_num: user.phoneNumber,
        verif_code: code
        
        
    }, parseCheckVerification);
}

/**
*   Parses verification check response.
*/
User.parseCheckVerification = function(response) {
    
    var obj = JSON.parse(response);
    
    if (obj.status == FAILED) {
        //  Failed
        User.onInvalidVerification();
        return;
    }
    
    //  Correct verification
    var user = User.current;
    user.authToken = obj.auth_token;
    
    if (obj.already_signed_up) {
        User.fetchData();
    } else {
        User.onFirstSignIn();
    }
    
}

User.onInvalidVerification = function(){
    
}

/**
*   Called when user has signed in for the first time and needs
*   to set up profile data.
*/
User.onFirstSignIn = function(){
    
}

User.parseCookies();