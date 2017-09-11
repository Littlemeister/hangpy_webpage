/**
*   BACKEND
*
*   Functions for backend communication.
*/

function Backend(){}

/**
*   Performs a basic backend request.
*   Optionally provide a post object (key: decoded value).
*/
Backend.request = function(queryString, post = null, callback) {
    var url = Backend.BASE_URL + queryString;
    var user = User.current;
    
    if (user.phoneNumber) {
        url += "&user=" + encodeURIComponent(user.phoneNumber);
    }
    if (user.authToken) {
        url += "&token=" + user.authToken;
    }
    
    var usePost = post ? true : false;
    
    var request = {
        url: url,
        method: usePost ? 'POST' : 'GET',
        data: usePost ? post : null,
        success: function(response) {
            callback(response);
        },
    };
    
    if (post instanceof FormData) {
        //  Sending form data
        request.contentType = false;
        request.processData = false;
    }
    
    $.ajax(request);
}

Backend.BASE_URL = "http://partlight.tech/scripts/hangpy/backend.php?";