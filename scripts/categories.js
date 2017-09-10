/**
*   CATEGORIES
*
*   Functions for categories.
*/
function Categories() {}

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
