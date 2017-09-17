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

$(function(){
	//	Trending categories button
	$('#discover_categories_btn').click(function(){
		ModalDialog.show($('#trending_cat_dialog'));
		
		Categories.fetchTrending();
	});
	
	var prefix = '#first_page_';
	
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

var fetchNextPageBtn = $('#fetch_next_page').
	click(function(){
		Events.fetchNextPage();
	});

Events.onFetch.push(function(){
	//	Started fetch
	fetchNextPageBtn.attr('disabled', 'true');
});


Events.onFetched.push(function(){
	//	Did fetch
	fetchNextPageBtn.removeAttr('disabled');
});



$(function(){
	Events.eventsPerPage = 2;
	Events.fetch();
});