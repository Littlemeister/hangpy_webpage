/**
*   CATEGORIES
*
*   Functions for categories.
*/
function Categories() {}

/**
*   Fetches trending categories.
*/
Categories.fetchTrending = function(){
	var lat = 0.0;
	var long = 0.0;
	Backend.request('out=trending_categories&lat=' + lat + '&long=' + long, null, Categories.parseTrending);
}

Categories.parseTrending = function(response){
	var json = JSON.parse(response);
	
	var container = $('#trending_cat_container');
	for (var i = 0; i < 5; i++)
	for (var category of json.categories) {
		const categoryName = category.name;
		
		container.append(
			$('<article class="article_preview">').append(
				$('<div>').append(
					$('<div class="cover">').
						css('background-image', 'url("' + json.base_image_url + category.picture_url + '")')
				).append(
					$('<h2 class="event_name overlay">').text(categoryName)
				)
			).click(function(){
				Categories.selectForFilter(categoryName);
			})
		);
	}
}

/**
*   Fetch suggested categories based on an input string.
*/
Categories.fetchSuggested = function(string) {
    Backend.request('out=cat&src=' + encodeURIComponent(string), null, Categories.parseSuggested);
}

Categories.parseSuggested = function(response) {
    $('#_category-sugg-status').html("Response: " + response);
}

/**
*   Fetches a default category header image.
*/
Categories.fetchDefaultImage = function(category) {
    Backend.request('out=default_cat_image&name=' + encodeURIComponent(category), null,
                    Categories.parseDefaultImage);
}

Categories.parseDefaultImage = function(response) {
    $('#_category-img').attr('src', response);
    $('#_category-img-status').html("Response: " + response);
}

/**
*	Selects a specific category for a filter.
*/
Categories.selectForFilter = function(category) {
	$('#events_header').html(Strings.frontpage.explorePrefix)
		.append($('<span>').text(category));
	
	Events.filters.category = category;
	Events.clear();
	Events.fetch();

	//	Hide dialog
	ModalDialog.hide($('#trending_cat_dialog'));
}