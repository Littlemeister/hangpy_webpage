/**
*   EVENTS
*
*   Able to request and parse events.
*/

function Events(){}

Events.filters = {};

/**
*   Fetches event without location filtering.
*/
Events.fetch = function(page = 0){
    Events.fetchWithLocation(0.0, 0.0, 0.0, page);
}

/**
*   Fetches event with location filtering.
*/
Events.fetchWithLocation = function(latitude = 0.0, longitude = 0.0,
                                     distance = 0.0, page = 0) {
    
    var queryString = 'out=events';
    var filters = Events.filters;
    
    //  Perform filtering
    if (filters.category) {
        queryString += '&category=' + encodeURIComponent(filters.category);
    }
    
    if (filters.searchQuery) {
        queryString += '&s=' + encodeURIComponent(filters.searchQuery);
    }
    
    if (filters.startSeconds) {
        queryString += '&starts=' + filters.startSeconds;
    }
    
    if (filters.minAttendanceCount > -1) {
        queryString += '&min_attendees=' + filters.minAttendanceCount;
    }
    
    if (filters.maxAttendanceCount > -1) {
        queryString += '&max_attendees=' + filters.maxAttendanceCount;
    }
    
    
    if (latitude > 0.0 && longitude > 0.0 && distance > 0.0) {
        queryString += "&lat=" + latitude;
        queryString += "&long=" + longitude;
        queryString += "&distance=" + distance;
    }
    
    
    Backend.request(queryString, null, Events.parseEvents);
}

Events.parseEvents = function(response, page){
    
    var obj = JSON.parse(response);
    
    var events = obj.events;

    if (events.length == 0 && page == 0){
        Events.onNoEvents();
        return;
    }
    
    $('#events').html(JSON.stringify(events));
}

/**
*   Called if no events are present.
*/
Events.onNoEvents = function(){
}