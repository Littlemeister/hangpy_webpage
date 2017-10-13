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
    $('#phone_number').text(data.phoneNumber);

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
	Profile.fetchedMyEvents = true;

	$('#my_events_loading').addClass('hidden');

	var obj = JSON.parse(response);
	var events = obj.events;

	if (events.length == 0){
		//	Has no my events
		$('#my_events_section .no_events').removeAttr('style');
		return;
	}

    var eventList = $('#my_events');

    for (let event of events){
		const id = event.id;
		const hasNotification = event.has_notification;

        eventList.append(
            $('<article class="article_preview">').append(
                $('<div>').append(
					$('<h2 class="event_name overlay">').text(event.name)
				).append(
					hasNotification ? $('<img class="notify_badge">')
						.attr('src', 'assets/ic_event_notification.png') : null
				)
				.append(
					$('<div class="cover">').css('background-image', 'url(' + obj.base_image_url + event.cover_image + ')')
				)
            ).click(function(){
				//	Show event info
				if (hasNotification){
					$(this).find('.notify_badge').remove();
				}
				Frontpage.initEventInfo(id);
			})
        );
	}
}

/**
 * Fetches events for the my events section.
 */
Profile.fetchAchievements = function() {
	$('#achievements_loading').removeClass('hidden');
    Backend.request('out=achievements', null, Profile.parseAchievements);
}

Profile.parseAchievements = function(response){
	$('#achievements_loading').addClass('hidden');

	var obj = JSON.parse(response);
	var numUnlocked = 0;

	let container = $('#achievements');
	var article;
	for (let item of obj.items) {
		article = $('<article>')
			.append(
				$('<img class="icon">')
					.attr('src', obj.base_icon_url + item.icon)
					.attr('alt', item.name)
			).append(
				item.unlocked ? $('<img class="unlocked_badge" src="assets/ic_checked_circle.png">').attr('alt', Strings.profile.achievements.unlocked)
					: null
			)
			.append(
				$('<div>')	
					.append(
						$('<h4 class="name">').text(item.name)
					).append(
						$('<p class="description">').text(item.description)
					)
			).toggleClass('unlocked', item.unlocked)
			.appendTo(container);

		if (item.unlocked) {
			numUnlocked++;
		}
	}

	const percentUnlocked = Math.floor(100 * (numUnlocked / obj.items.length));

	$('#achievements_section .percent').text(percentUnlocked + '%');
	$('#achievements_progress').show().find('div').css('width', percentUnlocked + '%');
}

/**
 * Changes the current section.
 */
Profile.changeSection = function(sectionId){
	var underlineLeft;
	var nthCurrentNavLi;

	switch (sectionId){
		case 'my_events_section':
		underlineLeft = '0';

		if (!Profile.fetchedMyEvents){
			//	Need to fetch my events
			Profile.fetchMyEvents();
			Profile.fetchedMyEvents = true;
		}
		nthCurrentNavLi = 1;

		break;

		case 'achievements_section':
		underlineLeft = '33.33%';
		
		if (!Profile.fetchedAchievements){
			//	Need to fetch my events
			Profile.fetchAchievements();
			Profile.fetchedAchievements = true;
		}
		nthCurrentNavLi = 2;
		break;
		
		case 'settings_section':
		underlineLeft = '67%';
		nthCurrentNavLi = 3;
		break;

		default:
		console.log("Invalid section: " + sectionId);
		return;
	}

	$('#profile_page .nav_underline').css('left', underlineLeft);
	var section = $('#' + sectionId);

	if (Profile.currentSection){
		if (section == Profile.currentSection) {
			//	Not changing section
			return;
		}
		//	Hide old section
		Profile.currentSection.hide();
	}

	let baseNavLiSelector = '#profile_page .tab_nav li', baseNavLiClass = 'current';
	$(baseNavLiSelector + '.current').removeClass(baseNavLiClass);
	$(baseNavLiSelector + ':nth-child(' + nthCurrentNavLi + ')').addClass(baseNavLiClass);

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
	let fileName = 'uploaded_file';
	let data = new FormData();
	data.append(fileName, file, '1.jpg');

	Backend.request('action=change_profile_picture', data, function(response){
		Profile.parseProfilePicture(response, file);
	});
}

Profile.parseProfilePicture = function(response, file){
	let notify = Notification.show;
	if (response == SUCCESS){
		Profile.changeProfilePicture(file);
		notify(Strings.didUpload);

		//	Hide camera capture dialog if visible
		if (ModalDialog.hide($('#camera_capture'))){
			//	Did upload via camera capture
			CameraCapture.stop();
		}
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
		$('#profile_picture, #header_wrapper .profile_picture')
			.css('background-image', 'url(' + fileReader.result + ')');
	};
	fileReader.readAsDataURL(file);
}

/**
 * Reloads the app and apllies the selected language.
 */
Profile.applyLanguage = function(){
	let checked = $('#settings_section input[name="lang"]:checked'),
		lang = checked.attr('data_lang');

	document.cookie = "ui_lang=" + lang + ";expires=Sat, Jan 01 2050 01:00:00";
	let loc = document.location;

	document.location = loc.origin + '/' + lang + '/' + loc.pathname;
}

$(function() {
	GUI.showListeners.push(function(pageId){
		if (pageId == 'profile_page' && !Profile.isSetup) {
			//	Perform initial setup
			Profile.isSetup = true;
		
			Profile.setupSectionNav();
		
			//	Only show default section
			$('#profile .section').hide();
		
			Profile.changeSection(Profile.initialSection);
		
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
		
			//	Hide achievements progress
			$('#achievements_progress').hide();
		
			$('#apply_language').click(function(){
				Profile.applyLanguage();
			});
		}
	});
});
