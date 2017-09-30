/**
*   EVENTS
*
*   Able to request and parse events.
*/

function Events(){}

Events.filters = {};

/**
*	Whether events are currently being fetched.
*/
Events.fetching = false;

/**
*	Whether the last event have been fetched.
*/
Events.fetchedLast = false;

/**
*	Array of listeners, each called once events are being fetched.
*/
Events.onFetch = new Array(0);

/**
*	Array of listeners, each called once events hve been fetched.
*/
Events.onFetched = new Array(0);

/**
*	Current page of events.
*/
Events.page = 0;

/**
*   Clears fetched events HTML.
*/
Events.clear = function(){
    $('#frontpage_articles').html('');
}

/**
*	Maybe fetches the next page of events.
*/
Events.fetchNextPage = function(page = 0){
	if (!Events.fetching) {
    	return Events.fetch(++Events.page);	
	}
	return false;
}

/**
*   Fetches event without location filtering.
*/
Events.fetch = function(page = 0){
    return Events.fetchWithLocation(0.0, 0.0, 0.0, page);
}

Events.fetch = function(page = 0) {
	
	if (Events.fetching) {
		//	Busy
		return false;
	}
	
	Event.fetching = true;
	
	for (var listener of Events.onFetch){
		listener();
	}
	
    var queryString = 'out=events';
	
	queryString += '&page=' + page + '&results=' + Events.eventsPerPage;
	
    var filters = Events.filters;
    
    //  Perform filtering
    if (filters.category) {
        queryString += '&category=' + encodeURIComponent(filters.category);
    }
    
    if (filters.searchQuery) {
        queryString += '&s=' + encodeURIComponent(filters.searchQuery);
    }
    
    if (filters.startSeconds !== undefined) {
		//	Start around this time
        queryString += '&starts=' + filters.startSeconds;
    }
	
	if (filters.daysWithinStart) {
        queryString += '&within_days=' + filters.daysWithinStart;
	}
    
    if (filters.minAttendanceCount > -1) {
        queryString += '&min_attendees=' + filters.minAttendanceCount;
    }
    
    if (filters.maxAttendanceCount > -1) {
        queryString += '&max_attendees=' + filters.maxAttendanceCount;
    }
    
    
    if (filters.latitude > 0.0 && filters.longitude > 0.0 && filters.distance > 0.0) {
        queryString += "&lat=" + latitude;
        queryString += "&long=" + longitude;
        queryString += "&distance=" + distance;
    }
    
    $('#events_loading').removeClass('hidden');
	
    Backend.request(queryString, null, Events.parseEvents);
	
	return true;
}

Events.parseEvents = function(response, page) {
	Event.fetching = false;
	
	for (var listener of Events.onFetched){
		listener();
	}
	
	$('#events_loading').addClass('hidden');
	
    if (response == UNAUTHORIZED) {
        //$('#_events').html('Can\'t fetch events: unauthorized');
        return;
    }
    
    var obj = JSON.parse(response);
    
    var events = obj.events;

    if (events.length == 0){
		if (page == 0){
			//	No events whatsoever
        	Events.onNoEvents();
		} else {
			//	Reached last
			Events.onLastEventFetched();
		}
        return;
    }
	
	if (events.length < Events.eventsPerPage) {
		//	Reached last
		Events.onLastEventFetched();
	}
    
    var eventsContainer = $('#frontpage_articles');
    for (let event of events) {
        $('<article class="frontpage_article">')
            .attr('data-id', event.id)
            .toggleClass('paid', event.special)
            .append(
                $('<div>').
                    append(
                        $('<h2 class="event_name overlay"></h2>').text(event.name)
                    ).append(
                        $('<div class="cover">').
                            css('background-image', 'url("' + obj.base_image_url + event.cover_image + '")')
                    )
                    .click(function(){
                        Frontpage.initEventInfo($(this).attr('data-id'));
                    })
                ).appendTo(eventsContainer);
    }
	
    $('#_events').html(JSON.stringify(events));
}

/**
*   Called if no events are present.
*/
Events.onNoEvents = function(){
}

/**
*   Called if fetched the last events.
*/
Events.onLastEventFetched = function(){
	Events.fetchedLast = true;
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