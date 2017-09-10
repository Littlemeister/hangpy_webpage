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
        //  Not jQuery object
        newLayout = $(newLayout);
    }
}