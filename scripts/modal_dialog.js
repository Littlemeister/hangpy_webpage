/**
*	MODAL DIALOG
*
*	Functions for modal dialogs.
*/

function ModalDialog(){
}

/* Shows a modal dialog. Element should be a jQuery dialog element. */
ModalDialog.show = function(element){
	var background = element.parent();
	background.addClass('visible').removeClass('hiding');
}

/* Dismisses a modal dialog. Element should be a jQuery dialog element. */
ModalDialog.hide = function(element){
	const transitionEvent = 'webkitTransitionEnd transitionend';
	var background = element.parent();
	background.removeClass('visible').addClass('hiding').on(transitionEvent, function(){
		$(this).removeClass('hiding').off(transitionEvent);
	});
}

$(function(){
	
	//	Manage user dismissable dialogs
	//	Modal dialog backgrounds should have one .dialog child
	$('.modal_bg').click(function(){
		ModalDialog.hide($(this).find('.dialog'));
	});
	
	//	Prevents dialog from closing itself
	$('.modal_bg .dialog').click(function(e){
		e.preventDefault();
		e.stopPropagation();
	});
	
});