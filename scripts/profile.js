/**
*   PROFILE
*
*   Functions for showing the profile.
*/

function Profile() {}

/**
*   Dirty profile fields. Will be pushed to server on save().
*/
Profile.dirty = {};

/**
*   Shows the profile.
*/
Profile.show = function() {
    Profile.dirty = {};
    
    GUI.changeLayout($('#profile'));
}

/**
*   Saves changes in the user's profile.
*/
Profile.save = function(){
    var dirty = Profile.dirty;
    Backend.request('action=update_data', dirty, function(response){
        Profile.onSaved();
    });
}

/**
*   Called once the user's profile has been saved.
*/
Profile.onSaved = function(){
    
}

/**
*   Sets up element listeners and updates them based off user data.
*/
Profile.setupElements = function(){
    var data = User.current;
    
    $('#profile_picture').attr('src', data.picture_url);
    $('#display_name').text(data.display_name);
    $('#full_name').text(data.name);
    $('#phone_num_hidden').attr('checked', data.phone_num_hidden);
    
    //  Profile.dirty has underscores so it can be passed in POST
    
    $('#bio').val(data.bio || '').change(function(){
        Profile.dirty.bio = $(this).val();
    });
    
    var suffix = '-name-input';
    $('#display' + suffix).change(function(){
        Profile.dirty.display_name = $(this).val();
    });
    
    $('#phone-num-hidden').change(function(){
        Profile.dirty.phone_num_hidden = this.checked;
    });
    
    $('#snapchat-input').val(data.snapchat_username || '').change(function(){
        Profile.dirty.snapchat_username = $(this).val();
    });
}

/**
*   Changes the profile picture image and uploads the picture.
*/
Profile.changeProfilePicture = function(pictureFile) {
    var fileReader = new FileReader();
    
    fileReader.onload = function(){
        //  Update image
        
    };
    
    fileReader.readAsDataURL(pictureFile);
    
    var formData = new FormData();
    formData.append('uploaded_file', pictureFile);
    
    Backend.request('action=change_profile_picture', formData, Profile.onProfilePictureUploaded);
}

/**
*   Changes the profile picture image and uploads the picture.
*/
Profile.onProfilePictureUploaded = function() {
}

/**
*   Converts an array of "my events" to HTML.
*/
Profile.convertMyEventsToHtml = function(events){
    var eventList = $('#my-events');
    
    for (let event of events){
        eventList.append(
            $('<li>').append(
                $('<h3 class="event-header">')
            )
        );
    }
}

/**
*   Converts an array of achievements to HTML.
*/
Profile.convertAchievementsToHtml = function(achievements){
    var list = $('#achievements');
    
    for (let event of events){
        eventList.append(
            $('<li>').append(
                $('<h3 class="event-header">')
            )
        );
    }
}