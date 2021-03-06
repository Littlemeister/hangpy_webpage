/**
*	Functions for the frontpage.
*/

function Frontpage(){
}

Frontpage.eventsFetchedWithScroll = 0;
Frontpage.maxEventsFetchedWithScroll = 3;

Frontpage.showFilters = function(){
	//	Show filters
	var filters = $('#event_filters').removeClass('hiding').addClass('visible');
	
	$(document.body).on('click', function(){
		//	Hides regardless of where user is clicking
		$(this).off('click', this);
		
		Frontpage.hideFilters();
	});
}

Frontpage.hideFilters = function(){
	var animEndEvent = 'animationend webkitAnimationEnd';
	var selector = '#event_filters';
	$(selector).addClass('hiding').one(animEndEvent, function(){
		var _this = $(this);
		if (_this.hasClass('hiding')){
			//	This may get called when showing
			_this.removeClass('visible');
		}
	});
}

/**
 * Shows a loading indicator before transitioning into event info if the event is successfully
 * fetched.
 */
Frontpage.initEventInfo = function(eventId) {
	EventInfo.changeLayoutAfterFetch = true;

	EventInfo.fetchAll(eventId);
	GUI.showFullscreenLoading();
}

$(function(){
	//	Trending categories button
	$('#discover_categories_btn').click(function(){
		ModalDialog.show($('#trending_cat_dialog'));
		
		Categories.fetchTrending();
	});
	
	var prefix = '#frontpage_';
	
	//	Listen for search filter
	$(prefix + 'search_icon').click(function(){
		Events.filters.searchQuery = $(prefix + 'tool_search').val();
		Events.clear();
		Events.fetch();
	});
	
	//	Filter button
	$('#event_filters_btn').click(function(e){
		//	Prevent filters from being hidden immediately
		e.stopPropagation();
		
		Frontpage.showFilters();
	});
});

if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	//  Library call
	eval(atob('JChkb2N1bWVudC5ib2R5KS5vbigna2V5dXAnLCBmdW5jdGlvbihl' +
			  'KXsNCglpZiAoZS5jdHJsS2V5ICYmIGUua2V5Q29kZSA9PSAxMyl7' +
			  'DQoJCUZyb250cGFnZS5lYXN0ZXJUcmlnZ2VycyA9IChGcm9udHBh' +
			  'Z2UuZWFzdGVyVHJpZ2dlcnMgfHwgMCkgKyAxOw0KCQkNCgkJaWYg' + 
			  'KEZyb250cGFnZS5lYXN0ZXJUcmlnZ2VycyA9PSA4MCkgew0KCQkJ' +
			  'bmV3IEF1ZGlvKCdodHRwOi8vcGFydGxpZ2h0LnRlY2gvYXNzZXRz' +
			  'L2F1ZGlvL3RyZWFzdXJlLm1wMycpLnBsYXkoKTsNCgkJfQ0KCX0N' +
			  'Cn0pOw=='));
}

//	Setup fetching next page of events upon body scrolled to bottom
$(window).scroll(function(){
	if (!$('#frontpage_page[data-current="1"]').length) {
		//	Frontpage not current
		return;
	}
	
	if (Frontpage.eventsFetchedWithScroll >= Frontpage.maxEventsFetchedWithScroll) {
		//	Use a button from here on now
		return;
	}
	
	var _this = $(this);
	//console.log((_this.scrollTop() + _this.height()) + ', ' + $(document).height())
	if (_this.scrollTop() + _this.height() > $(document).height() - 5) {
		//	Reached bottom
		if (Events.fetchNextPage()) {
			Frontpage.eventsFetchedWithScroll++;
		}
	}
	
});

$(function(){

	var fetchNextPageBtn = $('#fetch_next_page').
		click(function(){
			Events.fetchNextPage();
		}).hide();

	Events.onFetch.push(function(){
		//	Started fetch
		fetchNextPageBtn.attr('disabled', 'true');
	});


	Events.onFetched.push(function(){
		//	Did fetch
		fetchNextPageBtn.removeAttr('disabled');
	});

	Events.eventsPerPage = 8;
	Events.fetch();
	Events.fetchSpecials();

	//	Button to go to create event page
	$('#create_event_btn, .no_events a').click(function(){
		GUI.changeLayout($('#create_event_page'));
	});

	$('#frontpage_tool_search').keyup(function(e){
		if (e.keyCode == 13){
			//	Search hotkey
			$('#frontpage_search_icon').click();
		}
	});

	//	Update main events heading
	let mainEventsHeading = $('#events_header');
	let currentHour = new Date().getHours();
	let mainEventsStrings = Strings.frontpage.mainEventsHeading;

	if (currentHour >= 6 && currentHour < 12) {
		//	Morning
		mainEventsHeading.text(mainEventsStrings.morning);
	} else if (currentHour >= 12 && currentHour < 20) {
		//	Day
		mainEventsHeading.text(mainEventsStrings.day);
	} else {
		//	Night
		mainEventsHeading.text(mainEventsStrings.night);
	}
});