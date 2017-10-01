/**
 * An extension to EventInfo, providing functions for the "all attendees" dialog.
 */

/**
 * Page for fetching attendees while showing all.
 */
EventInfo.attendeesPage = 0;

/**
*	Generic fetch attendees function.
*/
EventInfo.fetchAttendees = function(eventId, limit, page, searchQuery){
	var outQuery = "out=attendees&event_id=" + eventId;
	if (limit) {
		outQuery += "&limit=" + limit;
	}
	if (page) {
		outQuery += "&page=" + page;
	}
	if (searchQuery) {
		outQuery += "&s=" + encodeURIComponent(searchQuery);
	}
	
	Backend.request(outQuery, undefined, EventInfo.parseAttendees);
}

EventInfo.parseAttendees = function(response){
    var obj = JSON.parse(response);

    if (!EventInfo.hasPreviewAttendees) {
        //  First call, inflate preview list
        EventInfo.hasPreviewAttendees = true;

        var previewObj = {
            base_picture_url: obj.base_picture_url,
            attendees: obj.attendees.slice(0, 4)
		}

		$('#event_info_attendees_show_all').toggle(obj.attendees.length >= 4);

        EventInfo.appendAttendees(previewObj, '#event_attendees_preview');
    }

    EventInfo.appendAttendees(obj);
}

/**
*	Appends attendee list items to the attendees list.
*	An object obtained from the server as a attendees fetch response should be passed. 
*/
EventInfo.appendAttendees = function(fullAttendeesObj, selector='#event_attendees_all .event_attendees') {
	var container = $(selector).html('');
	
	for (let attendee of fullAttendeesObj.attendees) {
		const id = attendee.id;

		$('<li>')
			.append(
				$('<div class="profile_picture">')
					.css('background-image', 'url(' + fullAttendeesObj.base_picture_url + attendee.picture_url + ')')
			).append(
				$('<p>').text(attendee.name)
			).appendTo(container)
			.click(function(){
				//	Show details
				UserDetailsDialog.fetchAndShow(id);
			});
	}
}

/**
 * Fetches the next page of attendees.
 */
EventInfo.fetchNextAttendees = function(eventId){
    EventInfo.fetchAttendees(eventId, 8, EventInfo.attendeesPage++);
}

$(function(){
	$('#search_attendee').on('input', function(){
		EventInfo.fetchAttendees(EventInfo.currentEventId, 8, 0, $(this).val());
	});
});