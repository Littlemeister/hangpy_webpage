/**
*	NOTIFICATION
*/

function Notification(){}

Notification.show = function(message) {
	var animationEvent = 'animationend';
	
	var notif = $('#notification').html(message).removeClass('hiding')
		.addClass('visible').one(animationEvent, function(){
		
	}).removeAttr('style');
		
	clearTimeout(Notification.hidingTimeout);

	Notification.hidingTimeout = setTimeout(function(){

		notif.removeClass('visible').addClass('hiding')
			.one(animationEvent, function(){
			
			$(this).hide();
			
		});

	}, 4000);
}