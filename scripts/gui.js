/**
*   GUI
*
*   General GUI functions.
*/

function GUI() {}

/**
*   Changes the current layout to newLayout.
*/
GUI.changeLayout = function(newLayout) {
    if (!newLayout instanceof $) {
        //  Not a jQuery object
        newLayout = $(newLayout);
    }

    var currentLayout = $('.page[data-current]');
    currentLayout.removeAttr('data-current');

    newLayout.attr('data-current', '1').removeClass('hidden');

    var transitionEvent = 'webkitTransitionEnd transitionend';
    currentLayout.addClass('hiding').on(transitionEvent, function(){
        $(this).removeClass('hiding').addClass('hidden').off(transitionEvent);
    });
}

/**
 * Shows the fullscreen loading, preventing any other interaction with the site.
 */
GUI.showFullscreenLoading = function(){
    $('#fullscreen_loading').show();
}

/**
 * Hides the fullscreen loading.
 */
GUI.hideFullscreenLoading = function(){
    $('#fullscreen_loading').hide();
}