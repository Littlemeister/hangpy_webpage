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
*	Fetches all pieces of data for a specific event.
*/
EventInfo.fetchAll = function(eventId){
	EventInfo.currentEventId = eventId;

	Backend.request("out=event_details&event_id=" + eventId, undefined, EventInfo.parseAllFetch);
	EventInfo.fetchAttendeesPreview(eventId);
	EventInfo.fetchUserPosts(eventId);
}

EventInfo.parseAllFetch = function(response){
	var obj = JSON.parse(response);
	
	var classPrefix = '.event_';
	$(classPrefix + 'host').text(obj.host);
	$(classPrefix + 'category').text(obj.category);
	$(classPrefix + 'location').text(obj.location);
	$(classPrefix + 'name').text(obj.name);
	
	let hasDescription = obj.description !== undefined;
	$('#event_description p').text(hasDescription ? obj.description : 'Eventet har ingen info')
		.toggleClass('empty', hasDescription);
	
	//	Append gallery
	let galleryContainer = $('#event_gallery').html('');
	for (let galleryItem of obj.gallery) {
		$('<div class="event_gallery_item">')
			.css('background-image', 'url(' + obj.base_image_url + galleryItem + ')')
			.appendTo(galleryContainer);
	}
	
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
	
	if (EventInfo.changeLayoutAfterFetch) {
		GUI.changeLayout($('#event_info_page'));
		GUI.hideFullscreenLoading();
	}
}

/**
*	Fetches the attendees shown in the attendees preview.
*/
EventInfo.fetchAttendeesPreview = function(eventId) {
	EventInfo.fetchAttendees(eventId, EventInfo.parseAttendeesPreview, 4);
}

EventInfo.parseAttendeesPreview = function(response){
	var obj = JSON.parse(response);
	
	EventInfo.appendAttendees(obj);
}

/**
*	Generic fetch attendees function.
*/
EventInfo.fetchAttendees = function(eventId, callback, limit){
	var outQuery = "out=attendees&event_id=" + eventId;
	if (limit) {
		outQuery += "&limit=" + limit;
	}
	
	Backend.request(outQuery, undefined, callback);
}

/**
*	Appends attendee list items to the attendees list.
*	An object obtained from the server as a attendees fetch response should be passed. 
*/
EventInfo.appendAttendees = function(fullAttendeesObj) {
	var container = $('#event_info_attendees').html('');
	
	for (let attendee of fullAttendeesObj.attendees) {
		$('<li>').append(
			$('<div class="profile_picture">')
				.css('background-image', 'url(' + fullAttendeesObj.base_picture_url + attendee.picture_url + ')')
		).append(
			$('<p>').text(attendee.name)
		).appendTo(container);
	}
}

/**
*	Callback intended for setting up a Google map.
*/
EventInfo.initMap = function(){
	var initialLocation = { lat: 62.9015, lng: 15.3809 };
	
	var map = EventInfo.map = new google.maps.Map($('#event_info_map')[0], {
		center: initialLocation,
		zoom: 8
	});
}

/**
*	Attempts to approve the event.
*/
EventInfo.attemptApprove = function(){
	if (!User.isSignedIn()) {
		EventInfo.onNotSignedIn();
		return;
	}
}

/**
*	User wanted to do something which requires them to be signed in, and they're not.
*/
EventInfo.onNotSignedIn = function(){
	//	Prompt sign-in
	ModalDialog.show($('#login_dialog'));
}

/**
 * Fetches user posts for a specific event.
 */
EventInfo.fetchUserPosts = function(eventId){
	Backend.request("out=user_posts&event_id=" + eventId, null, EventInfo.parseUserPosts);
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
	var appendData;
	var lastTopLevelPost;	//	ID of last non-reply
	for (let post of obj.posts) {
		author = authors[post.author];

		appendData = {
			id: post.id,
			list: userPostList,
			author_picture_url: author.picture_url,
			message: post.text
		};

		if (post.is_reply) {
			appendData.reply_to = lastTopLevelPost;
		} else {
			lastTopLevelPost = post.id;
		}

		EventInfo.insertUserPost(appendData);

		i++;
	}
}

/**
 * Appends a user post element to the list.
 * The parameter object may contain the following:
 * id : post ID
 * list : if the parent list is provided, it doesn't need to be sought up
 * author_picture_url : author profile picture URL
 * message : post message
 * reply_to : optional user post ID which this is a reply to
 * is_last_reply : optionally whether this is the last reply
 * insert_after : optional user post element which to insert this after
 * prepend : optional whether to prepend to the list
 */
EventInfo.insertUserPost = function(postObj){
	var insertAfter = postObj.insert_after !== undefined;
	if (!insertAfter && postObj.list === undefined){
		postObj.list = $('#event_info_comments');
	}

	var useReplyForm = true || postObj.is_last_reply || !postObj.reply_to;

	var replyForm = !useReplyForm ? null : 
		$('<form class="reply_wrapper" method="post">').append(
			$('<input type="text" class="input">')
		).append(
			$('<input type="submit" class="submit">')
		).on('submit', function(e){
			e.preventDefault();

			var _this = $(this);
			var userPostParent = _this.closest('li');
			
			if (userPostParent.hasClass('reply')) {
				//	Find top-level user post
				var replyingTo = userPostParent.prev('li').attr('data-id');
			} else {
				//	Replying to this post
				var replyingTo = userPostParent.attr('data-id');
			}

			var message = _this.find('.input').val();

			EventInfo.createUserPost(message, replyingTo);
		});


	var li = $('<li>').append(
		$('<div class="profile_picture">').css(
			'background-image',
			'url(' + postObj.author_picture_url + ')'
		)
	).append(
		$('<div class="content">').append(
			$('<p class="message">').text(postObj.message)
		).append(
			replyForm
		)
	).toggleClass('reply', postObj.reply_to !== undefined)
		.attr('data-id', postObj.id);

	var canDelete = true;
	if (canDelete) {
		//	User can delete this comment
		const id = postObj.id;

		$('<a class="delete">').prependTo(li).click(function(){

		});
	}


	if (postObj.reply_to) {
		li.attr('data-reply-to', postObj.reply_to);
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

	var appendData = {
		message: message,
		id: obj.post_id,
		author_picture_url: User.current.picture_url,
		reply_to: replyTo,
		prepend: replyTo === undefined
	}

	if (replyTo !== undefined) {
		debugger;

		var replies =
			$('#event_info_comments li[data-reply-to=' + replyTo + ']');

		if (replies.length == 0) {
			//	Insert after top-level post
			appendData.insert_after = $('#event_info_comments li[data-id=' + replyTo + ']');
		} else {
			appendData.insert_after = $(replies[replies.length - 1]);

			//	Move reply field
			appendData.insert_after.find('.reply_wrapper').remove();
		}
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
	
}

$(function(){
	//	Button to approve current event
	$('#event_info_approve').click(function(){
		EventInfo.attemptApprove();
	});
	
	//	Button to submit a user post (comment)
	$('#comment_form').submit(function(e){
		e.preventDefault();
		
		var input = $(this).find('.input');

		EventInfo.createUserPost(
			input.val()
		);

		input.val('');
	});

	EventInfo.fetchAll(53);

	$('#event_info_nav_back').click(function(){
		//	Go back to frontpage
		GUI.changeLayout($('#frontpage_page'));
	});
});