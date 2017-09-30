/**
*   CREATE EVENT
*
*   Functions specifically for the create event page.
*/

function CreateEvent() {}

/**
*   Gallery files for pending created event.
*/
CreateEvent.gallery = [];

/**
*   Currently submitting gallery item.
*/
CreateEvent.galleryItemIndex = 0;

CreateEvent.maxDateInAdvance = 7;

/**
 * Whether end time was changed. Otherwise it will change if start time changes.
 */
CreateEvent.endTimeChanged = false;

/**
 * Default event duration in hours.
 */
CreateEvent.defaultEventDuration = 5;

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
CreateEvent.createEvent = function(eventObj) {
    $('#_create-event-status').html('Submitting event');
    
    Backend.request("action=create_event", eventObj,
    CreateEvent.parseCreateEvent);
}

CreateEvent.parseCreateEvent = function(response) {
    if (response == FAILED){
        CreateEvent.onCreateEventFailed();
        return;
    }
    $('#_create-event-status').html('Response: ' + response + " (SUCCESS)");
    
    var eventObj = JSON.parse(response);
    
    CreateEvent.createdEventId = eventObj.event_id;

    CreateEvent.submitNextGalleryItem();
}

/**
*   Submits the next gallery item.
*/
CreateEvent.submitNextGalleryItem = function() {
    var galleryItem = CreateEvent.gallery[CreateEvent.galleryItemIndex];

    if (typeof(galleryItem) == "string") {
        //  Not a file
        postData = {
            existing_file_name: galleryItem
        };
    } else {
        var postData = new FormData();
        postData.append('uploaded_file', galleryItem, '0.jpg');
    }

    Backend.request('action=append_gallery&event_id=' + CreateEvent.createdEventId,
        postData, CreateEvent.onSubmitGalleryItem);
}

CreateEvent.onSubmitGalleryItem = function(response){
    if (CreateEvent.galleryItemIndex == CreateEvent.gallery.length - 1){
        
        //  Last one
        CreateEvent.onSubmittedGallery();
        
    } else {
        CreateEvent.galleryItemIndex++;
        CreateEvent.submitNextGalleryItem();
    }
}

CreateEvent.onSubmittedGallery = function() {
    CreateEvent.onCreateEventSuccess();
}

/**
 * Called once the event has been created successfully.
 */
CreateEvent.onCreateEventSuccess = function() {
    //  Go to event; frontpage behavior
    Frontpage.initEventInfo(CreateEvent.createdEventId);
}

CreateEvent.onCreateEventFailed = function() {
    $('#_create-event-status').html('Response: ' + response + " (FAILED)");
}

/**
 * Initializes the map in the create event form.
 */
CreateEvent.initMap = function() {
    var initialLocation = { lat: 62.9015, lng: 15.3809 };
	
	var map = CreateEvent.map = new google.maps.Map($('#create_event_map')[0], {
		center: initialLocation,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
		zoom: 4
	});
	map.addListener('click', function(e) {
        CreateEvent.setEventLocation(e.latLng);
    });
    
    var searchBox = new google.maps.places.SearchBox($('#create_event_map_search')[0]);
    
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
}

/**
 * Sets the event location and updates the map.
 */
CreateEvent.setEventLocation = function(latLng, locationName){
    var _class = CreateEvent;
    if (_class.mapMarker) {
        _class.mapMarker.setPosition(latLng);
    } else {
        _class.mapMarker = new google.maps.Marker({
            position: latLng,
            map: _class.map
        });
        
        _class.map.setCenter(latLng);
        _class.map.setZoom(12);
    }

    if (locationName !== undefined) {
        //  Don't need to reverse geocoding
        CreateEvent.onReversedGeocodedLocation(locationName);
    } else {
        CreateEvent.reverseGeocode(latLng);
    }

    CreateEvent.validateForm();
}

/**
 * Called once the location has been reversed geocoded and a location name has been obtained.
 */
CreateEvent.onReversedGeocodedLocation = function(locationName){
    CreateEvent.eventLocationName = locationName;
    CreateEvent.maybeSuggestEventName();
}

/**
 * Suggests an event name if both location and category is set.
 */
CreateEvent.maybeSuggestEventName = function(){
    var category = $('#event_category_input').val();
    var locationName = CreateEvent.eventLocationName;

    let eventNameInput = $('#event_name_input');
    eventNameInput.attr('placeholder',
        (category && locationName) ? Strings.createEvent.nameSuggestion.replace('$0', category).replace('$1', locationName)
            : null
    );
}

CreateEvent.fetchCategories = function(source){
    Backend.request('out=cat&src=' + encodeURIComponent(source), null, CreateEvent.parseCategories);
}

CreateEvent.parseCategories = function(response){
    var items = response.split(',');

    var suggestions = $('#event_name_suggestions').removeClass('hidden').removeClass('gone');
    var list = suggestions.find('ul');
    list.html('');

    for (let item of items){
        $('<li>')
            .text(item).appendTo(list)
            .click(function(){
                //  Selected suggested category
                CreateEvent.selectSuggestedCategory($(this).text());
            });
    }
}

CreateEvent.selectSuggestedCategory = function(category){
    $('#event_category_input').val(category);
    CreateEvent.hideSuggested();
}

CreateEvent.handleCategoryKeyEvent = function(e){
    var up = e.keyCode == 38;
    var down = e.keyCode == 40;
    var select = e.keyCode == 13;

    if (!up && !down && !select) {
        return;
    }

    var suggestedList = $('#event_name_suggestions ul');
    var highlightedItem = suggestedList.find('li.highlighted');

    if (select) {
        //  Select highlighted item
        if (highlightedItem.length) {
            //  Has highlighted item
            CreateEvent.selectSuggestedCategory(highlightedItem.html());
        }
        return;
    }

    if (!highlightedItem.length) {
        highlightedItem = suggestedList.find('li:last-of-type');
    }

    var nextItem = up ? highlightedItem.prev('li') : highlightedItem.next('li');
    if (!nextItem.length) {
        //  Last item
        nextItem = suggestedList.find('li:' + (up ? 'last' : 'first') + '-of-type');
    }

    highlightedItem.removeClass('highlighted');
    nextItem.addClass('highlighted');
}

/**
 * Hides suggested categories.
 */
CreateEvent.hideSuggested = function(){
    var eventName = 'transitionend webkitTransitionEnd';

    $('#event_name_suggestions').addClass('hidden').on(eventName, function(){
        $(this).addClass('gone').off(eventName);
    });
}

CreateEvent.fetchCategoryImage = function(category){
    Backend.request('out=default_cat_image&name=' + encodeURIComponent(category), null, function(response){
        if (response.length > 0){
            CreateEvent.categoryImage = response.substring(response.lastIndexOf('/') + 1);
            CreateEvent.gallery.push(CreateEvent.categoryImage);
            CreateEvent.onGalleryItemAdded(response);
        }
    });
}

/**
 * Updates start & end dates elements.
 */
CreateEvent.updateDates = function(){
    var startDateElement = $('#event_start_d_input');
    var endDateElement = $('#event_end_d_input');

    //  Date obj for the time fields
    var timeDate = new Date();
    var timeDateMins = timeDate.getMinutes();

    if (timeDateMins % 30 != 0){
        timeDate.setMinutes(timeDateMins + (30 - timeDateMins % 30));
    }

    //  Set initial time
    $('#event_start_t_input').val(
        Utils.zeroFill(timeDate.getHours()) + ':' + Utils.zeroFill(timeDate.getMinutes())
    );

    var startHours = timeDate.getHours();
    timeDate.setHours(startHours + CreateEvent.defaultEventDuration);
    var endHours = timeDate.getHours();
    
    $('#event_end_t_input').val(
        Utils.zeroFill(endHours) + ':' + Utils.zeroFill(timeDate.getMinutes())
    );

    function option(date) {
        return $('<option>').text(date.getDate() + ' ' + Strings.months[date.getMonth()]);
    }

    var date = new Date();

    for (let i = 0, n = CreateEvent.maxDateInAdvance; i < n; i++) {
        option(date).appendTo(endDateElement);
        option(date).appendTo(startDateElement);

        date.setHours(date.getHours() + 24);
    }

    if (endHours < startHours) {
        //  Next day
        endDateElement[0].selectedIndex = 1;
    }
}

CreateEvent.onGalleryItemFileAdded = function(file) {
    CreateEvent.gallery.push(file);

    var reader = new FileReader();

    reader.onload = function(){
        CreateEvent.onGalleryItemAdded(reader.result);
    }

    reader.readAsDataURL(file);
}

CreateEvent.onGalleryItemAdded = function(imageUrl) {
    var galleryElement = $($('.event_gallery.empty')[0])
        .css('background-image', 'url(' + imageUrl + ')')
        .removeClass('empty');

    $('.event_gallery[data_index=' +
        (Number.parseInt(galleryElement.attr('data_index')) + 1) + ']')
        .removeClass('disabled');

    CreateEvent.validateForm();
}

CreateEvent.removeGalleryItem = function(index) {
    CreateEvent.gallery.splice(index, 1);

    var galleryElement = $('.event_gallery[data_index=' + index + ']');
    galleryElement.css('background-image', '').addClass('empty');

    //  Disable next sibling
    $('.event_gallery[data_index=' + (index + 1) + ']')
        .addClass('disabled');

    //  Shift next photos
    $('.event_gallery:not([data_index=' + index + '])')
        .each(function(i, e){
            e = $(e);
            var _index = Number.parseInt(e.attr('data_index'));
            if (_index < index) {
                //  Is previous
                return;
            }

            if (!e.hasClass('empty')) {
                //  Previous gets this image
                $('.event_gallery[data_index=' + (_index - 1) + ']').css(
                    'background-image',
                    e.css('background-image')
                ).removeClass('empty');

                e.css('background-image', '').addClass('empty');
            }
        });

    //  Refresh disabled
    $('.event_gallery')
        .each(function(i, e){
            let _index = Number.parseInt(e.getAttribute('data_index'));
            if ($('.event_gallery[data_index=' + (_index - 1) + ']').hasClass('empty')) {
                e.classList.add('disabled');
            }
        });
}

CreateEvent.validateForm = function(){
    var submit = $('#event_create_submit').attr('disabled', 'disabled');

    var stringGroup = Strings.createEvent.invalidField;

    if (!CreateEvent.mapMarker) {
        //  No location
        CreateEvent.onInvalidField(stringGroup.location);
        return false;
    }
    
    if (!$('#event_category_input').val()) {
        //  No category
        CreateEvent.onInvalidField(stringGroup.category);
        return false;
    }

    if (!$('#event_category_input').val()) {
        //  No category
        CreateEvent.onInvalidField(stringGroup.category);
        return false;
    }
    
    var nameInput = $('#event_name_input');
    if (!nameInput.val() && !nameInput.attr('placeholder')) {
        //  No name
        CreateEvent.onInvalidField(stringGroup.name);
        return false;
    }

    var _class = CreateEvent;
    if (_class.gallery.length == 0 && !_class.categoryImage) {
        //  No photos
        CreateEvent.onInvalidField(stringGroup.photo);
        return false;
    }

    submit.removeAttr('disabled');
    $('#invalid_field_msg').addClass('hidden');

    return true;
}

/**
 * Validates the form, creates the event using the form data.
 */
CreateEvent.submitEventForm = function() {
    var lat = 0.0, lng = 0.0;
    var map = CreateEvent.map;
    var marker = CreateEvent.mapMarker;

    if (marker) {
        marker = marker.getPosition();
        lat = marker.lat();
        lng = marker.lng();
    }

    var nameInput = $('#event_name_input');

    //  Processes start/end date
    function datetimeString(useStart) {
        let dateInput = $('#event_' + (useStart ? 'start' : 'end') + '_d_input')[0],
            timeInput = $('#event_' + (useStart ? 'start' : 'end') + '_t_input');

        const date = new Date();
        date.setDate(date.getDate() + dateInput.selectedIndex);

        return date.getFullYear() + '-' + Utils.zeroFill(date.getMonth()) + '-' + Utils.zeroFill(date.getDate()) +
            ' ' + timeInput.val() + ':00'
    }

    var eventObj = {
        name: nameInput.val() || nameInput.attr('placeholder'),
        category: $('#event_category_input').val(),
        lat: lat,
        long: lng,
        starts: datetimeString(true),
        ends: datetimeString(false)
    };

    var description = $('#event_description_input').val();

    if (description.length) {
        eventObj.description = description;
    }

    if (CreateEvent.validateForm()){
        CreateEvent.createEvent(eventObj);
    }
}

/**
 * Synchronizes the end time to stay a certain duration after the start time.
 */
CreateEvent.syncEndTime = function(startTimeElement) {
    var startTime = startTimeElement.val();

    var startTime = new Date(0, 0, 0,
        Number.parseInt(startTime.substring(0, 2)),
        Number.parseInt(startTime.substring(3)));

    var startHours = startTime.getHours();

    startTime.setHours(startHours + CreateEvent.defaultEventDuration);

    var endHours = startTime.getHours();

    var endTimeElement = $('#event_end_t_input');
    endTimeElement.val(Utils.zeroFill(endHours) + ':' + Utils.zeroFill(startTime.getMinutes()));

    if (startHours > endHours) {
        //  Next day
        $('#event_end_d_input')[0].selectedIndex = $('#event_start_d_input')[0].selectedIndex + 1;
    }
}

/**
 * Notifies the user that a field has invalid input.
 */
CreateEvent.onInvalidField = function(message) {
    $('#invalid_field_msg').removeClass('hidden').html(message);
}

/**
 * Geocodes an adress and marks it as the event location.
 */
CreateEvent.geocode = function(address) {
    Backend.request("out=geocode&address=" + encodeURIComponent(address), null, function(response){
        if (!response){
            CreateEvent.onGeocodeAddressNotFound(address);
            return;
        }

        var latlng = response.split(',');
        CreateEvent.setEventLocation(
            new google.maps.LatLng(Number.parseFloat(latlng[0]), Number.parseFloat(latlng[1])),
            address
        );
    });
}

/**
 * Reverse geocodes a latitude and a longitude, for suggesting an event name.
 */
CreateEvent.reverseGeocode = function(latlng) {
    Backend.request("out=reverse_geocode&lat=" + latlng.lat() + "&long=" + latlng.lng(), null, function(response){
        CreateEvent.onReversedGeocodedLocation(response);
    });
}

CreateEvent.onGeocodeAddressNotFound = function(address) {

}

/**
 * Updates the event duration element.
 */
CreateEvent.onEventDurationChange = function() {
    //  Difference in minutes
    var minDifference;


    var start = new Date();
    var end = new Date();

    let startTimeElement = $('#event_start_t_input');
    let startTimeComponents = startTimeElement.val().match(/(\d+):(\d+)/);

    let endTimeElement = $('#event_end_t_input');
    let endTimeComponents = endTimeElement.val().match(/(\d+):(\d+)/);

    let startDateElement = $('#event_start_d_input');
    let endDateElement = $('#event_end_d_input');

    start.setHours(Number.parseInt(startTimeComponents[1]));
    start.setMinutes(Number.parseInt(startTimeComponents[2]));
    
    end.setHours(Number.parseInt(endTimeComponents[1]));
    end.setMinutes(Number.parseInt(endTimeComponents[2]));

    start.setDate(start.getDate() + startDateElement[0].selectedIndex);
    end.setDate(end.getDate() + endDateElement[0].selectedIndex);

    minDifference = (end.getTime() - start.getTime()) / 60000;

    let durationElement = $('#event_duration');

    if (minDifference < 0){
        durationElement.html(Strings.createEvent.invalidField.endBeforeStart);
        return;
    }
    
    if (minDifference < 30){
        durationElement.html(Strings.createEvent.invalidField.durationTooShort);
        return;
    }


    hourDifference = Math.round(minDifference / 60);

    var timeStrComponent;

    let durationStrings = Strings.createEvent.duration;

    if (hourDifference < 24){
        //  Less than a day
        var minModulo = minDifference % 30;
        if (minModulo == 0 && minDifference % 60 == 0) {
            //  Exact
            if (hourDifference == 1) {
                timeStrComponent = durationStrings.hour;
            } else {
                timeStrComponent = durationStrings.hours.replace('$', hourDifference);
            }
        } else {
            //  Approximately
            if (hourDifference == 1) {
                timeStrComponent = durationStrings.approxHour;
            } else {
                timeStrComponent = durationStrings.approxHours.replace('$', hourDifference);
            }
        }
    } else {
        //  More than a day
        var dayDifference = Math.floor(hourDifference / 24);
        hourDifference %= 24;
        
        if (dayDifference == 1) {
            if (hourDifference == 0){
                timeStrComponent = durationStrings.day;
            } else if (hourDifference == 1){
                timeStrComponent = durationStrings.dayHour;
            } else {
                timeStrComponent = durationStrings.dayHours.replace('$', hourDifference);
            }
        } else {
            timeStrComponent = durationStrings.days.replace('$', dayDifference);
        }
    }
    if (minModulo < 15) {

    }

    durationElement.html(durationStrings.base.replace('$', timeStrComponent));    
}

$(function(){
    $('#event_category_input').on('input', function(){
        //  Fetch suggested categories
        CreateEvent.fetchCategories(this.value);
    }).on('keydown', function(e){
        CreateEvent.handleCategoryKeyEvent(e);
    }).on('change', function(){
        CreateEvent.maybeSuggestEventName();
        
        if ($('#event_cat_gallery_input')[0].checked) {
            CreateEvent.fetchCategoryImage($(this).val());
        }
    }).on('blur', function(){
        //  Category input lost focus
        CreateEvent.hideSuggested();
    }).on('keydown', function(e){
        //  Prevent form submission
        if (e.keyCode == 13) {
            $(this).blur();
            e.preventDefault();
        }
    });

    $('#event_name_input').on('keydown', function(e){
        //  Prevent form submission
        if (e.keyCode == 13) {
            $(this).blur();
            e.preventDefault();
        }
    });

    CreateEvent.updateDates();

    //  Populate add photos content
    $('.event_gallery').append(
        $('<a>').append(
            $('<p class="add_photo">').html(Strings.createEvent.addPhoto)
        ).click(function(){
            $('#event_gallery_file').click();
        })
    ).addClass('empty');

    $('#event_gallery_file').change(function(){
        //  Did add an event gallery file
        CreateEvent.onGalleryItemFileAdded(this.files[0]);
    });

    //  Button to go back
    $('#create_event_back').click(function(){
        GUI.changeLayout($('#frontpage_page'));
    });

    $('#event_cat_gallery_input').change(function(){
        if (!this.checked){
            //  Don't use a default category image
            CreateEvent.removeGalleryItem(CreateEvent.gallery.findIndex(function(e){
                return e == CreateEvent.categoryImage;
            }));
            CreateEvent.categoryImage = undefined;
        } else {
            CreateEvent.fetchCategoryImage(
                $('#event_category_input').val()
            );
        }
    });

    var eventStartTimeInput = '#event_start_t_input';
    var eventEndTimeInput = '#event_end_t_input';
    
    $(eventStartTimeInput).change(function(){
        if (!CreateEvent.endTimeChanged){
            CreateEvent.syncEndTime($(this));
        }
        CreateEvent.onEventDurationChange();
    });

    $(eventEndTimeInput).change(function(){
        //  End time did change
        CreateEvent.endTimeChanged = true;
        CreateEvent.onEventDurationChange();
    });

    $('#event_start_d_input, #event_end_d_input').change(function(){
        //  Date changed
        CreateEvent.onEventDurationChange();
    });

    //  Check map search input
    $('#create_event_map_search').on('keydown', function(e){
        //  Check enter
        if (e.keyCode == 13){
            e.preventDefault(); //  Prevent submitting form
            CreateEvent.geocode($(this).val());
        }
    });

    $('#create_event_page form').on('submit', function(e){
        e.preventDefault();
        CreateEvent.submitEventForm();
    });

    //  The following are dependent for form validation
    $('#event_name_input, #event_category_input').change(function(){
        CreateEvent.validateForm();
    });

    CreateEvent.validateForm();
    
    $('.event_gallery .remove').click(function(){
        var topParent = $(this).closest('div[data_index]');

        CreateEvent.removeGalleryItem(topParent.attr('data_index'));
    });

    CreateEvent.onEventDurationChange();
});