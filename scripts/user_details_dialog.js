/**
 * Details for a specific user, a basic profile.
 */
function UserDetailsDialog() {}

/**
 * Starts asynchronous fetching of attendee details.
 */
UserDetailsDialog.fetchAndShow = function(attendeeId) {
    GUI.showFullscreenLoading();
    Backend.request("out=user_data&user_id=" + attendeeId, null, UserDetailsDialog.parseAndShow);
}

UserDetailsDialog.parseAndShow = function(response){
    let obj = JSON.parse(response);

    let dialog = $('#user_details_dialog');
    dialog.find('.profile_picture').css('background-image', 'url(' + obj.picture_url + ')');
    dialog.find('.full_name').text(obj.name);
    dialog.find('.display_name').text(obj.display_name);
    dialog.find('.snapchat_username').toggle(obj.snapchat_username ? true : false).find('span').text(obj.snapchat_username);
    dialog.find('.phone_number').toggle(!obj.phone_num_hidden).find('span').text(obj.phone_num);
    dialog.find('.bio').text(obj.bio);
    ModalDialog.show(dialog);
    GUI.hideFullscreenLoading();
}