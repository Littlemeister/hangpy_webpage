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