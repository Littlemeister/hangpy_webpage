/**
*   PROFILE
*
*   Functions for showing the profile.
*/

function Profile() {}

/**
 * Initial section to show.
 */
Profile.initialSection = "my_events_section";

/**
*   Shows the profile.
*/
Profile.show = function() {
    GUI.changeLayout($('#profile'));
}

/**
*   Called once the user's profile has been saved.
*/
Profile.parseUpdateData = function(response){
	let strings = Strings;
	Notification.show(response == SUCCESS ? strings.profile.didSave : strings.genericError);
}

/**
 * Updates some piece of profile data.
 */
Profile.saveData = function(dirtyData){
	Backend.request('action=update_data', dirtyData, Profile.parseUpdateData);
}

/**
*   Sets up element listeners and updates them based on user data.
*/
Profile.setupElements = function(){
	var data = User.current;

    $('#profile_picture').css('background-image', 'url(' + data.picture_url + ')');
    $('#display_name').val(data.display_name).change(function(){
		//	Display name did change
		Profile.saveData({ display_name: $(this).val() });
	});
    $('#full_name').text(data.name);

    //  Profile.dirty has underscores so it can be passed in POST

    $('#bio').val(data.bio || '').change(function(){
		Profile.saveData({ bio: $(this).val() });
    });

    $('#phone_num_hidden').attr('checked', data.phone_num_hidden).change(function(){
		Profile.saveData({ phone_num_hidden: !this.checked ? '1' : '0' });
    });

    $('#snapchat_input').val(data.snapchat_username || '').change(function(){
		Profile.saveData({ snapchat_username: $(this).val() });
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
 * Fetches events for the my events section.
 */
Profile.fetchMyEvents = function() {
	$('#my_events_loading').removeClass('hidden');
    Backend.request('out=my_events', null, Profile.parseMyEvents);
}

Profile.parseMyEvents = function(response){
	$('#my_events_loading').addClass('hidden');

	var obj = JSON.parse(response);
	var events = obj.events;
	debugger;

    var eventList = $('#my_events');

    for (let event of events){
		const id = event.id;

        eventList.append(
            $('<article class="article_preview">').append(
                $('<div>').append(
					$('<h2 class="event_name overlay">').text(event.name)
				).append(
					$('<div class="cover">').css('background-image', 'url(' + obj.base_image_url + event.cover_image + ')')
				)
            ).click(function(){
				//	Show event info
				Frontpage.initEventInfo(id);
			})
        );
	}

	Profile.fetchedMyEvents = true;
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

/**
 * Changes the current section.
 */
Profile.changeSection = function(sectionId){
	var underlineLeft;
	switch (sectionId){
		case 'my_events_section':
		underlineLeft = '0';

		if (!Profile.fetchedMyEvents){
			//	Need to fetch my events
			Profile.fetchMyEvents();
		}

		break;

		case 'achievements_section':
		underlineLeft = '33.33%';
		break;
		
		case 'settings_section':
		underlineLeft = '66.66%';
		break;

		default:
		console.log("Invalid section: " + sectionId);
		return;
	}

	$('#nav_underline').css('left', underlineLeft);
	var section = $('#' + sectionId);

	if (Profile.currentSection){
		//	Hide old section
		Profile.currentSection.hide();
	}

	Profile.currentSection = section;
	section.show();
}

/**
 * Sets up section navigation.
 */
Profile.setupSectionNav = function(){
	//	Nav IDs
	const myEvents = 'my_events_nav',
	achievements = 'achievements_nav',
	settings = 'settings_nav';

	$('#' + myEvents + ',#' + achievements + ',#' + settings).click(function(){
		//	Clicked a nav button
		var newSection;

		switch (this.id){
			case myEvents:
			newSection = 'my_events_section';
			break;
			
			case achievements:
			newSection = 'achievements_section';
			break;
			
			case settings:
			newSection = 'settings_section';
			break;
		}

		Profile.changeSection(newSection);
	});
}

/**
 * Called once a profile picture is pending upload.
 */
Profile.uploadProfilePicture = function(file){
	debugger;
	let fileName = 'uploaded_file';
	let data = new FormData();
	data.append(fileName, file);

	Backend.request('action=change_profile_picture', data, function(response){
		Profile.parseProfilePicture(response, file);
	});
}

Profile.parseProfilePicture = function(response, file){
	debugger;

	let notify = Notification.show;
	if (response == SUCCESS){
		Profile.changeProfilePicture(file);
		notify(Strings.didUpload);
	} else {
		notify(Strings.genericError);
	}
}

/**
 * Changes a profile picture from a file after it's been successfully uploaded.
 */
Profile.changeProfilePicture = function(file){
	let fileReader = new FileReader();
	fileReader.onload = function(){
		$('#profile_picture').css('background-image', 'url(' + fileReader.result + ')');
	};
	fileReader.readAsDataURL(file);
}

$(function() {
	Profile.setupSectionNav();

	//	Only show default section
	$('#profile .section:not(#' + Profile.initialSection + ')').hide();

	const profilePicFileInput = '#profile_pic_file';

	//	Button to change profile picture from file
	$('#change_profile_pic').click(function(){
		$(profilePicFileInput).click();
	});

	//	Button to change profile picture from camera capture
	$('#capture_profile_pic').click(function(){
		CameraCapture.showDialog();
	});

	/* Profile picture file was uploaded */
	$(profilePicFileInput).change(function(){
		let file = this.files[0];
		if (file) {
			Profile.uploadProfilePicture(file);
		}
	});

	const confirmDeleteAccountDialog = '#confirm_delete_account';
	$(confirmDeleteAccountDialog + ' .confirm').click(function(){
		//	Confirmed delete account
		ModalDialog.hide($(confirmDeleteAccountDialog));
		User.deleteAccount();
	});

	//	Sign out button
	$('#sign_out').click(function(){
		User.signOut();
	});

	//	Delete account button
	$('#delete_account').click(function(){
		//	First step in deleting account
		ModalDialog.show($(confirmDeleteAccountDialog));
	});
});
