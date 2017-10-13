/**
*	EVENT INFO
*
*	JS for the "event info" section, displaying a single, specific event.
*/

function EventInfo() {}

/**
 * Whether to change from a transitioning state once all has been parsed.
 */
EventInfo.changeLayoutAfterFetch = false;

EventInfo.currentEventId = 0;

/**
 * Child index of current gallery item.
 */
EventInfo.currentGalleryItem = 0;

/**
 * Fetch buffer.
 */
EventInfo.repliesPerPost = 8;

/**
 * Number of previewed replies when collapsed.
 */
EventInfo.numOfPreviewPosts = 4;

/**
 * Resets the page for viewing another event.
 */
EventInfo.reset = function(){
	//	Initially hide the button to show all attendees
	$('#event_info_attendees_show_all,#no_user_posts').hide();
	EventInfo.hasPreviewAttendees = false;
}

/**
*	Fetches all pieces of data for a specific event.
*/
EventInfo.fetchAll = function(eventId){
	EventInfo.currentEventId = eventId;

	Backend.request("out=event_details&query_attendees_count&event_id=" + eventId, undefined, EventInfo.parseAllFetch);
	EventInfo.attendeesPage = 0;
	EventInfo.fetchNextAttendees(eventId);	//	Preview will be populated
	EventInfo.fetchUserPosts(eventId);

	//	For sharing event
	$('#event_share_c input').val(document.baseURI + 'event/' + eventId);
}

EventInfo.parseAllFetch = function(response){
	var changeLayoutAfterFetch = EventInfo.changeLayoutAfterFetch;
	if (changeLayoutAfterFetch) {
		GUI.hideFullscreenLoading();
	}

	if (!response){
		Notification.show(Strings.eventInfo.notFound);
		return;
	}

	var obj = EventInfo.eventData = JSON.parse(response);
	
	var classPrefix = '.event_';
	$(classPrefix + 'host').text(obj.host);
	$(classPrefix + 'category').text(obj.category);
	$(classPrefix + 'location').text(obj.location);
	$(classPrefix + 'info_name').text(obj.name);
	$(classPrefix + 'attendees_count').text(obj.attendees_count);

	var startDate = new Date(obj.start);
	var endDate = new Date(obj.end);
	
	var startDay = startDate.getDate();

	$('#event_start_date').text(startDay + ' ' + Strings.months[endDate.getMonth()].substring(0, 3));

	var endDay = endDate.getDate();
	var endDateElement = $('#event_end_date');
	if (startDay == endDay) {
		//	Same day
		endDateElement.hide();
	} else {
		endDateElement.text(endDay + ' ' + Strings.months[endDate.getMonth()].substring(0, 3));
	}
	
	let hasDescription = obj.description !== undefined;
	$('#event_description').text(hasDescription ? obj.description : Strings.eventInfo.noDescription)
		.toggleClass('empty', hasDescription);
	
	//	Append gallery
	var galleryContainer = $('#event_gallery').html('');

	//	Container for quickly changing gallery items
	var quickContainer = $('#event_header #quick_container').html('');

	$('#event_info_delete').toggle(obj.user_hosted);
	$('#event_info_approve').toggle(!obj.user_hosted);

	EventInfo.reset();

	for (let n = 0; n < 4; n++)
	for (let i = 0; i < obj.gallery.length; i++) {
		const _i = i + n;

		$('<div class="event_gallery_item">')
			.css('background-image', 'url(' + obj.base_image_url + obj.gallery[i] + ')')
			.appendTo(galleryContainer);

		$('<a>').click(function(){

			EventInfo.changeGalleryItem(_i);

		}).appendTo(quickContainer);
	}

	$('.event_gallery_item').addClass('right');

	EventInfo.changeGalleryItem(EventInfo.currentGalleryItem);
	
	//	Setup map
	var map = EventInfo.map;
	
	if (!map){
		//	Map not yet initialized
		return;
	}
	
	var lat = obj.latitude, long = obj.longitude;
	var pos = new google.maps.LatLng(lat, long);
	
	map.setCenter(pos);
	
	var marker = new google.maps.Marker({
		position: pos,
		map: map
	});

	if (changeLayoutAfterFetch) {
		GUI.changeLayout($('#event_info_page'));
	}
}

/**
*	Callback intended for setting up a Google map.
*/
EventInfo.initMap = function(){
	var initialLocation = { lat: 62.9015, lng: 15.3809 };
	
	var map = EventInfo.map = new google.maps.Map($('#event_info_map')[0], {
		center: initialLocation,
		zoom: 12,
		fullscreenControl: false
	});
}

/**
*	Attempts to approve the event.
*/
EventInfo.approveEvent = function(eventId){
	if (!User.isSignedIn()) {
		EventInfo.onNotSignedIn();
		return;
	}

	const eventName = $('.event_info_name').html();
	Backend.request("action=approve_event", null, function(response){
		EventInfo.parseApproveEvent(response, eventName)
	});
}

EventInfo.parseApproveEvent = function(response, eventName){
	if (response != SUCCESS) {
		//	Failed
		return;
	}

	Notification.show(Strings.eventInfo.didApprove.replace('$', eventName));
}

/**
*	User wanted to do something which requires them to be signed in, and they're not.
*/
EventInfo.onNotSignedIn = function(){
	//	Prompt sign-in
	ModalDialog.show($('#sign_in_dialog'));
}

/**
 * Fetches user posts for a specific event.
 */
EventInfo.fetchUserPosts = function(eventId){

	Backend.request("out=user_posts&event_id=" + eventId + "&replies_per_post=" + EventInfo.repliesPerPost, null, EventInfo.parseUserPosts);
}

EventInfo.parseUserPosts = function(eventId){
	var obj = JSON.parse(eventId);

	//	Author indexed by id
	var authors = new Array(0);

	for (let author of obj.authors) {
		authors[author.id] = author;
	}

	var i = 0;
	var userPostList = $('#event_info_comments').html('');
	var userPostElement;
	var numOfReplies;
	var appendData;
	var lastTopLevelPost;	//	ID of last non-reply

	if (obj.posts.length == 0){
		//	No user posts
		$('#no_user_posts').show();
		return;
	}

	for (let post of obj.posts) {
		author = authors[post.author];

		appendData = {
			id: post.id,
			since_created: post.since_created,
			list: userPostList,
			author: author.name,
			author_picture_url: author.picture_url,
			author_id: author.id,
			message: post.text
		};
		appendData.is_last_reply = obj.posts.length > i + 1 &&
			!obj.posts[i + 1].is_reply;

		//	If last user post
		appendData.is_last_reply |= obj.posts.length == i + 1;

		if (post.is_reply) {
			appendData.reply_to = lastTopLevelPost;
		} else {
			lastTopLevelPost = post.id;
		}

		userPostElement = EventInfo.insertUserPost(appendData);

		if (!post.is_reply) {
			//	Check num of replies
			numOfReplies = 0;
			for (let j = i + 1, n = obj.posts.length; j < n; j++){
				if (!obj.posts[j].is_reply) {
					break;
				}
				numOfReplies++;
			}

			var numPreviews = EventInfo.numOfPreviewPosts;
			if (numOfReplies > numPreviews) {
				//	Replies overflow
			}
		}

		i++;
	}
}

/**
 * Appends a user post element to the list.
 * The parameter object may contain the following:
 * id : post ID
 * since_created : minutes since post was created
 * list : if the parent list is provided, it doesn't need to be sought up
 * author : author name
 * author_id : author ID
 * author_picture_url : author profile picture URL
 * message : post message
 * reply_to : optional user post ID which this is a reply to
 * is_last_reply : optionally whether this is the last reply (or top-lever without replies)
 * insert_after : optional user post element which to insert this after
 * prepend : optional whether to prepend to the list
 */
EventInfo.insertUserPost = function(postObj){
	var insertAfter = postObj.insert_after !== undefined;
	if (!insertAfter && postObj.list === undefined){
		postObj.list = $('#event_info_comments');
	}

	var insertReplyForm = postObj.is_last_reply;

	var li = $('<li>').append(
		$('<div class="profile_picture">').css(
			'background-image',
			'url(' + postObj.author_picture_url + ')'
		)
	).append(
		$('<div class="content">').append(
			'<span class="notch">'
		).append(
			$('<p class="sender">').text(postObj.author)
		).append(
			$('<p class="message">').text(postObj.message)
		)
	).toggleClass('reply', postObj.reply_to !== undefined)
		.attr('data_id', postObj.id);

	var createdStrs = Strings.eventInfo.duration;
	var createdStr = createdStrs.minute;

	var sinceCreated = postObj.since_created;

	if (sinceCreated > 0) {
		if (sinceCreated > 60) {
			//	Hours since
			sinceCreated = Math.floor(sinceCreated / 60);
			
			if (sinceCreated == 1){
				createdStr = createdStrs.hour;
			} else {
				createdStr = createdStrs.hours.replace('$', sinceCreated);
			}

			if (sinceCreated > 24){
				//	Days since
				sinceCreated = Math.floor(sinceCreated / 24);

				if (sinceCreated == 1){
					createdStr = createdStrs.day;
				} else {
					createdStr = createdStrs.days.replace('$', sinceCreated);
				}
			}
		} else {
			createdStr = createdStrs.minutes.replace('$', sinceCreated);
		}
	}
	
	var canDelete = postObj.author_id == User.current.id;
	if (canDelete) {
		//	User can delete this comment
		const id = postObj.id;

		$('<a class="delete">').click(function(){
			EventInfo.deletePost(id);
		}).appendTo(li);
	}

	li.append(
		$('<p class="since_created">').text(createdStrs.base.replace('$', createdStr))
	);


	if (postObj.reply_to) {
		li.attr('data_reply_to', postObj.reply_to);
	}
	
	if (insertAfter){
		li.insertAfter(postObj.insert_after);
	} else {
		//	Regularly append to list
		if (postObj.prepend) {
			li.prependTo(postObj.list);
		} else {
			li.appendTo(postObj.list);
		}
	}

	if (insertReplyForm) { 
		$('<li class="reply_form">').append(
			$(`<form class="reply_wrapper" method="post">`).append(
				$('<input type="text" class="input">')
					.attr('placeholder', Strings.eventInfo.replyToPost)
			).append(
				$('<div class="submit_c">')
					.append(
						'<div></div>'
					)
					.append(
						'<input type="submit" value="">'
					)
			).on('submit', function(e){
				e.preventDefault();
				EventInfo.submitUserPostReply($(this));
			})
		)
		.insertAfter(li)
		.attr('data_parent_id', postObj.reply_to ? postObj.reply_to : postObj.id);
	}


	return li;
}

EventInfo.submitUserPostReply = function(sender){
	var li = sender.closest('li');
	var replyingTo = li.attr('data_parent_id');
	
	var message = sender.find('.input').val();

	EventInfo.createUserPost(message, replyingTo);
}

/**
 * Creates/submits a user post. replyTo is an optional ID to reply to.
 */
EventInfo.createUserPost = function(message, replyTo) {
	if (!User.isSignedIn()) {
		EventInfo.onNotSignedIn();
		return;
	}
	
	let eventId = EventInfo.currentEventId;

	var data = {
		event_id: EventInfo.currentEventId,
		text: message
	};

	if (replyTo !== undefined) {
		data.reply_to = replyTo;
	}

	Backend.request("action=create_user_post", data, function(response){
		EventInfo.parseCreateUserPost(response, message, replyTo);
	});
}

EventInfo.parseCreateUserPost = function(response, message, replyTo) {
	var obj = JSON.parse(response);

	if (obj.status != SUCCESS) {
		EventInfo.onCreateUserPostFailed();
		return;
	}

	const user = User.current;

	var appendData = {
		message: message,
		id: obj.post_id,
		author: user.display_name,
		author_id: user.id,
		author_picture_url: User.current.picture_url,
		reply_to: replyTo,
		prepend: replyTo === undefined
	}

	if (replyTo !== undefined) {
		var replies =
			$('#event_info_comments .reply[data_reply_to=' + replyTo + ']');

		if (replies.length == 0) {
			//	Insert after top-level post
			appendData.insert_after = $('#event_info_comments li[data_id=' + replyTo + ']');
		} else {
			appendData.insert_after = $(replies[replies.length - 1]);
		}
	} else {
		appendData.is_last_reply = true;
	}

	EventInfo.insertUserPost(appendData);
}

/**
 * Called when the user couldn't create a user post.
 */
EventInfo.onCreateUserPostFailed = function(){

}

/**
 * Deletes a post as an authorized.
 */
EventInfo.deletePost = function(postId) {
	Backend.request("action=delete_post", {
		post_id: postId
	}, function(response) {
		EventInfo.parseDeletePost(response, postId);
	})
}

EventInfo.parseDeletePost = function(response, postId) {
	console.log(response);
	if (response != SUCCESS) {
		//	Unknown error, probably unauthorized.
		return;
	}

	//	Delete post and replies
	$('#event_info_comments li[data_id=' + postId + '],' + 
		'#event_info_comments li[data_reply_to=' + postId + ']').remove();
}

EventInfo.changeGalleryItem = function(childIndex){
	var galleryItemCount = $('#event_gallery')[0].children.length;
	
	if (childIndex >= galleryItemCount){
		childIndex -= galleryItemCount;
	}

	if (childIndex < 0){
		childIndex += galleryItemCount;
	}

	let item = $('.event_gallery_item:nth-child(' + (childIndex + 1) + ')')
		.removeClass('left').removeClass('right');

	item.prevAll().addClass('left').removeClass('right');
	item.nextAll().addClass('right').removeClass('left');

	EventInfo.currentGalleryItem = childIndex;

	var quickBtns = $('#event_header #quick_container a').removeClass('selected');
	quickBtns[childIndex].classList.add('selected');
}

/**
 * Attempts to delete an event.
 */
EventInfo.deleteEvent = function(eventId){
	//	Keeping beta reject_event
	Backend.request("action=reject_event&event_id=" + eventId, null, EventInfo.parseDeleteEvent);
}

EventInfo.parseDeleteEvent = function(response){
	if (response == SUCCESS){
		//	Successfully deleted event
		GUI.changeLayout($('#frontpage_page'));
		Notification.show(Strings.eventInfo.didDelete.replace('$', EventInfo.eventData.name));
	}
}

EventInfo.setShareVisibility = function(visible){
	var element = $('#event_share_c').removeClass('gone')
		.toggleClass('visible', visible);

	if (visible) {
		//	Show
		$(document.body).click(EventInfo.shareDimissHandler = function(){
			//	Clicked outside of share view
			EventInfo.setShareVisibility(false);

			$(this).unbind('click', EventInfo.shareDimissHandler);
			EventInfo.shareDimissHandler = undefined;
		});
	} else {
		const _event = 'transitionend webkitTransitionEnd';
		element.on(_event, function() {
			$(this).addClass('gone').off(_event);
		});
	}
}

$(function(){
	//	Button to approve current event
	$('#event_info_approve').click(function(){
		EventInfo.approveEvent();
	});
	
	//	Button to submit a user post (comment)
	$('#comment_form').submit(function(e){
		e.preventDefault();
		
		var input = $(this).find('.input');

		EventInfo.createUserPost(
			input.val()
		);

		input.val('');
	}).find('input').change(function(){
		//	Update character count
		let length = $(this).val().length;
		let maxLength = EventInfo.maxUserPostLen;

		$('#user_post_char_count').text(length + ' / ' + maxLength);
	}).attr('maxlength', EventInfo.maxUserPostLen);

	var prefix = '#event_';

	$(prefix + 'info_nav_back').click(function(){
		//	Go back to frontpage
		GUI.changeLayout($('#frontpage_page'));
	});

	$(prefix + 'expand_map').click(function(){
		//	Toggle map expand
		$('#event_info_meta').toggleClass('expanded');
	});

	$(prefix + 'info_meta').on('webkitTransitionEnd transitionend', function(){
		//	Did finish expand animation; did change size
		google.maps.event.trigger(EventInfo.map, "resize");
	});

	//	Share button
	$(prefix + 'info_share').click(function(e){
		e.stopPropagation();
		e.preventDefault();
		EventInfo.setShareVisibility(true);
	});

	$(prefix + 'share_c').click(function(e){
		//	Prevents hiding itself
		e.stopPropagation();
		e.preventDefault();
	});

	prefix += 'info_';

	$(prefix + 'info_delete').click(function(){
		//	Confirm event delete
		ModalDialog.show($('#confirm_delete_event'));
	});
	
	$(prefix + 'attendees_show_all').click(function(){
		//	Show all attendees
		ModalDialog.show($('#event_attendees_all'));
	});

	$('#confirm_delete_event .confirm').click(function(){
		//	Confirm delete event
		EventInfo.deleteEvent(EventInfo.currentEventId);
	});
	
	$(prefix + 'market').click(function(){
		//	Market event
		PaidEventSetup.setupFromEvent(EventInfo.eventData);
	});


	//	Gallery navigation
	prefix = '#event_gallery_';

	$(prefix + 'next').click(function() {
		//	Change to next gallery item
		EventInfo.changeGalleryItem(++EventInfo.currentGalleryItem);
	});
	$(prefix + 'prev').click(function(){
		//	Change to previous gallery item
		EventInfo.changeGalleryItem(--EventInfo.currentGalleryItem);
	});
});