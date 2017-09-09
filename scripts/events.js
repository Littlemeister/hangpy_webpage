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
    if (response == UNAUTHORIZED) {
        $('#_events').html('Can\'t fetch events: unauthorized');
        return;
    }
    
    var obj = JSON.parse(response);
    
    var events = obj.events;

    if (events.length == 0 && page == 0){
        Events.onNoEvents();
        return;
    }
    
    $('#_events').html(JSON.stringify(events));
}

/**
*   Called if no events are present.
*/
Events.onNoEvents = function(){
}

/**
*   Fetched a specific event.
*/
Events.fetchSpecific = function(eventId){
    Backend.request('out=event_details&event_id=' + eventId, null,
                    Events.parseEventData);
}

Events.parseEventData = function(response){
    $('#_event-data-status').html("Event data response: " + response);
}

/**
*   Fetched user posts for a specific event.
*/
Events.fetchAttendees = function(eventId){
    Backend.request('out=attendees&event_id=' + eventId, null,
                    Events.fetchAttendees);
}

Events.parseAttendees = function(response){
    $('#_event-attendees-status').html("Event attendees response: " + response);
}

/**
*   Fetched user posts for a specific event.
*/
Events.fetchUserPosts = function(eventId){
    Backend.request('out=user_posts&event_id=' + eventId, null,
                    Events.parseUserPosts);
}

Events.parseUserPosts = function(response){
    $('#_event-posts-status').html("Event posts response: " + response);
}

/**
*   Writes on a event; creates a user post for a specific event.
*   If replying to another post, pass replyTo as its ID.
*/
Events.createUserPost = function(eventId, message, replyTo){

    var postData = {
        
        text: message,
        event_id: eventId
        
    };
    
    if (replyTo) {
        postData.reply_to = replyTo;
    }
    
    Backend.request('action=create_user_post', postData, Events.parseCreateUserPost);
}

Events.parseCreateUserPost = function(response){
    $('#_event-posts-create-status').html("Response: " + response);
}

/**
*   Approves a specific event.
*   This means the user is interested in attending the event.
*/
Events.approveEvent = function(eventId){
    Backend.request('action=approve_event&event_id=' + eventId, null,
                    Events.parseApproveOrRejectEvent);
}

/**
*   Rejects a specific event. 
*   This means the user is not interested in attending the event.
*/
Events.rejectEvent = function(eventId){
    Backend.request('action=reject_event&event_id=' + eventId, null,
                    Events.parseApproveOrRejectEvent);
}

Events.parseApproveOrRejectEvent = function(response) {
    $('#_event-react-status').html("Response: " + response);
}