/**
*   CREATE EVENT
*
*   Functions specifically for the create event page.
*   Events.js is a dependency!
*/

/**
*   Gallery files for pending created event.
*/
Events.galleryFiles = [];

/**
*   Currently submitting gallery item.
*/
Events.galleryItemIndex = 0;

/**
*   Creates a new event.
*   Event object should contain the following decoded event info:
*       name : event name
*       category : event category
*       lat : event location latitude
*       long : event location longitude
*       starts : start datetime in the format YYYY-MM-DD HH:MM
*       ends : end datetime in the format YYYY-MM-DD HH:MM
*       description : (optional) event description
*/
Events.createEvent = function(eventObj) {
    $('#_create-event-status').html('Submitting event');
    
    Backend.request("action=create_event", eventObj,
                    Events.parseCreateEvent);
}

Events.parseCreateEvent = function(response) {
    
    if (response == FAILED){
        Events.onCreateEventFailed();
        return;
    }
    $('#_create-event-status').html('Response: ' + response + " (SUCCESS)");
    
    var eventObj = JSON.parse(response);
    
    Events.createdEventId = eventObj.event_id;
    Events.submitGallery();
}

/**
*   Submits the next gallery item.
*/
Events.submitNextGalleryItem = function() {
    var formData = new FormData();
    formData.append('uploaded_file', Events.galleryFiles[Events.galleryItemIndex], '0.jpg');

    Backend.request('action=append_gallery&event_id=' + Events.createdEventId,
                   formData, Events.onSubmitGalleryItem);
}

Events.onSubmitGalleryItem = function(response){
    if (Events.galleryItemIndex == Events.galleryFiles.length - 1){
        
        //  Last one
        Events.onSubmittedGallery();
        
    } else {
        Events.galleryItemIndex++;
        Events.submitNextGalleryItem();
    }
}

Events.onSubmittedGallery = function() {
    Events.onCreateEventSuccess();
}

Events.onCreateEventSuccess = function() {
}

Events.onCreateEventFailed = function() {
    $('#_create-event-status').html('Response: ' + response + " (FAILED)");
}