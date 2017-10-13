/**
*   GUI
*
*   General GUI functions.
*/

function GUI() {}

/* Listeners to be notified when a page shows. One argument is the page id. */
GUI.showListeners = [];

/* Listeners to be notified when a page hides. One argument is the page id. */
GUI.hideListeners = [];

/**
*   Changes the current layout to newLayout.
*/
GUI.changeLayout = function(newLayout) {
    if (!newLayout instanceof $) {
        //  Not a jQuery object
        newLayout = $(newLayout);
    }

    var currentLayout = $('.page[data-current]');

    if (newLayout[0].id == currentLayout[0].id) {
        return;
    }

    currentLayout.removeAttr('data-current');

    newLayout.addClass('showing').attr('data-current', '1').removeClass('hidden');

    for (let listener of GUI.showListeners) {
        listener(newLayout[0].id);
    }

    for (let listener of GUI.hideListeners) {
        listener(currentLayout[0].id);
    }

    var _event = 'webkitAnimationEnd animationend';
    currentLayout.addClass('hiding').on(_event, function(){
        $(this).removeClass('hiding').addClass('hidden').off(_event);
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