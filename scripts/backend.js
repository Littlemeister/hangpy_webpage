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
    
    //  Debug
    user.phoneNumber = "+46721521129";
    user.authToken = "qTyiOC27RzWeOM54CuoD2ThswK4rU0Hl";
    
    if (user.phoneNumber) {
        url += "&user=" + encodeURIComponent(user.phoneNumber);
    }
    if (user.authToken) {
        url += "&token=" + user.authToken;
    }
    
    var usePost = post ? true : false;
    
    $.ajax({
        url: url,
        method: usePost ? 'POST' : 'GET',
        data: usePost ? post : null,
        success: function(response) {
            callback(response);
        },
    })
}

Backend.BASE_URL = "http://partlight.tech/scripts/hangpy/backend.php?";