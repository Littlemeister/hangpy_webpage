/**
*	EVENT FILTERS JS
*/

function EventFilters(){}

$(function(){
	
	var suffix = '_filter_confirm';
	
	//	Location confirm
	$('#location' + suffix).click(function(){
		EventFilters.applyLocation();
		ModalDialog.hide($('#location_filter_dialog'));
	});
	
	//	Attendees confirm
	$('#attendees' + suffix).click(function(){
		EventFilters.applyAttendees();
		ModalDialog.hide($('#attendees_filter_dialog'));
	});
	
	//	Start confirm
	$('#start' + suffix).click(function(){
		EventFilters.applyStart();
		ModalDialog.hide($('#start_filter_dialog'));
	});
	
	var distanceLabel = $('#distance_label')[0];
	$('#location_distance_input').on('input', function(){
		var val = this.valueAsNumber;
		
		var displayedVal = val;
		
		if (displayedVal < 1e3) {
			displayedVal += 'm';
		} else {
			displayedVal /= 1e3;
			displayedVal += 'km';
		}
		
		distanceLabel.innerText = displayedVal;
		
		var circle = EventFilters.mapCircle;
		if (circle){
			EventFilters.mapCircle.setRadius(val);
		}
		
	}).val(1000);
	
	$('#filter_location, #filter_attendees, #filter_start_time').click(function(){
		EventFilters.onFilterClicked(this);
	});
});

/**
*	Confirms and applies attendees count filter.
*/
EventFilters.applyLocation = function() {
	var distanceElement = $('#location_distance_input');
	var distance = Number.parseInt(distanceElement.val());
	
	var latLng = EventFilters.mapMarker.getPosition();
	
	var filters = Events.filters;
	filters.latitude = latLng.lat();
	filters.longitude = latLng.lng();
	filters.distance = distance;
}

/**
*	Confirms and applies attendees count filter.
*/
EventFilters.applyAttendees = function() {
	var minElement = $('#attendees_filter_min');
	var maxElement = $('#attendees_filter_min');
	
	var min = Number.parseInt(minElement.val());
	var max = Number.parseInt(maxElement.val());
	
	var filters = Events.filters;
	
	filters.minAttendanceCount = min;
	filters.maxAttendanceCount = max;
}

/**
*	Confirms and applies start filter.
*/
EventFilters.applyStart = function() {
	var daysDropdown = $('#start_filter_days');
	var daysVal = Number.parseInt(daysDropdown.value);
	
	var filters = Events.filters;
	
	filters.startSeconds = 4;
	filters.daysWithinStart = daysVal;
}

/**
*	Called when a filter button has been clicked. It should be passed as sender.
*/
EventFilters.onFilterClicked = function(sender){
	var filters = Events.filters;
	
	switch (sender.id) {
		case 'filter_location':
			
			if (filters.latitude || filters.longitude || filters.distance) {
				//	Filter is active
				delete filters.latitude;
				delete filters.longitude;
				delete filters.distance;
				
				EventFilters.onFilterDeselected(sender);
			} else {
				ModalDialog.show($('#location_filter_dialog'));
			}
			
			break;
		case 'filter_attendees':
			
			if (filters.minAttendanceCount || filters.maxAttendanceCount) {
				//	Filter is active
				delete filters.minAttendanceCount;
				delete filters.maxAttendanceCount;
				
				EventFilters.onFilterDeselected(sender);
			} else {
				ModalDialog.show($('#attendees_filter_dialog'));
			}
			
			break;
		case 'filter_start_time':
			
			if (filters.startSeconds || filters.daysWithinStart) {
				//	Filter is active
				delete filters.startSeconds;
				delete filters.daysWithinStart;
				
				EventFilters.onFilterDeselected(sender);
			} else {
				ModalDialog.show($('#start_filter_dialog'));
			}
				
			break;
	}
}

EventFilters.onFilterDeselected = function(sender){
}

/**
*	Inits the map for location filter dialog.
*/
EventFilters.initMap = function(){
	var initialLocation = { lat: 62.9015, lng: 15.3809 };
	
	var map = EventFilters.map = new google.maps.Map($('#location_filter_map')[0], {
		center: initialLocation,
		zoom: 4
	});
	map.addListener('click', function(e) {
		var filtersClass = EventFilters;
		
		var latLng = e.latLng;
		if (filtersClass.mapMarker) {
			filtersClass.mapMarker.setPosition(latLng);
			filtersClass.mapCircle.setCenter(latLng)
		} else {
			filtersClass.mapMarker = new google.maps.Marker({
				position: latLng,
				map: map
			});
	
			filtersClass.mapCircle = new google.maps.Circle({
				strokeColor: '#3C9595',
				strokeWeight: 2,
				fillColor: '#93DADA',
				fillOpacity: 0.5,
				map: map,
				radius: 10,
				center: latLng
			});
			
			filtersClass.map.setCenter(latLng);
			filtersClass.map.setZoom(12);
			
			$('#location_distance_input').trigger('input');
		}
	});
}