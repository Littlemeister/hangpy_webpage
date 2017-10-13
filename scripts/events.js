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
    $('#article_previews').html('');
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
 * Fetches a list of events.
 */
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

    Events.page = page;
    
    $('#events_loading').removeClass('hidden');
	
    Backend.request(queryString, null, Events.parseEvents);
	
	return true;
}

Events.parseEvents = function(response) {
	Events.fetching = false;

	for (var listener of Events.onFetched){
		listener();
	}
	
	$('#events_loading').addClass('hidden');

    if (response == UNAUTHORIZED) {
        //$('#_events').html('Can\'t fetch events: unauthorized');
        return;
    }

    Events.appendEvents({
        fullObj: JSON.parse(response),
        noEventsCallback: Events.onNoEvents,
        lastEventsFetchedCallback: Events.onLastEventFetched,
        page: Events.page,
        eventsPerPage: Events.eventsPerPage,
        container: $('#article_previews')
    });
}

/**
 * params should be an object with the following properties:
 *  fullObj : object returned by server
 *  noEventsCallback : function to call if no events
 *  lastEventsFetchedCallback : function to call if last events are fetched
 *  eventsPerPage : number of events per page
 *  page : page
 *  container : container jQuery object
 */
Events.appendEvents = function(params) {
    const obj = params.fullObj;
    var events = obj.events;

    if (events.length == 0){
        if (params.page == 0){
            //	No events whatsoever
            params.noEventsCallback();
        } else {
            //	Reached last
            params.lastEventsFetchedCallback();
        }
        return;
    }
    
    if (events.length < params.eventsPerPage) {
        //	Reached last
        params.lastEventsFetchedCallback();
    }
    
    const timeStrs = Strings.eventPreviewStart;
    var animDelay = 0;
    for (let event of events) {
        const id = event.id;
        let startTimeRemaining = 30 + 60 * 24 * 2 * Math.random(); //event.start_mins_remaining;
        let startTimeStr = timeStrs.minutes;
        var startsSoon = true;

        if (startTimeRemaining >= 60) {
            startTimeRemaining = Math.floor(startTimeRemaining / 60);
            if (startTimeRemaining == 1){
                startTimeStr = timeStrs.hour;    
            } else {
                startTimeStr = timeStrs.hours;
            }

            startsSoon = startTimeRemaining <= 2;
            
            if (startTimeRemaining >= 24) {
                //  Days remaining
                startTimeRemaining = Math.floor(startTimeRemaining / 24);
                if (startTimeRemaining == 1){
                    startTimeStr = timeStrs.day;
                } else {
                    startTimeStr = timeStrs.days;
                }
            }
        }

        $('<article class="article_preview">')
            .toggleClass('paid', event.special)
            .css('animation-delay', animDelay + 'ms')
            .append(
                $('<div>').
                    append(
                        $('<h2 class="event_name overlay"></h2>').text(event.name)
                    ).
                    append(
                        $('<h2 class="event_start_remaining"></h2>').text(
                            timeStrs.startsIn.replace('$', startTimeStr.replace('$', startTimeRemaining))
                        ).toggleClass('soon', startsSoon)
                    ).append(
                        $('<div class="cover">').
                            css('background-image', 'url("' + obj.base_image_url + event.cover_image + '")')
                    )
                    .click(function(){
                        Frontpage.initEventInfo(id);
                    })
                ).appendTo(params.container);
                
        animDelay += 50;
    }
}

/**
*   Called if no events are present.
*/
Events.onNoEvents = function(){
    $('#frontpage_page .no_events').removeAttr('style');
}

/**
*   Called if fetched the last events.
*/
Events.onLastEventFetched = function(){
	Events.fetchedLast = true;
}

/**
 * Fetches special events without filtering.
 */
Events.fetchSpecials = function() {
    Backend.request("out=events&only_special=1", null, Events.parseSpecials);
}

Events.parseSpecials = function(response){

    Events.appendEvents({
        fullObj: JSON.parse(response),
        noEventsCallback: Events.onNoEvents,
        lastEventsFetchedCallback: Events.onLastEventFetched,
        page: Events.page,
        eventsPerPage: Events.eventsPerPage,
        container: $('#paid_events')
    });
}