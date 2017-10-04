/**
*	MODAL DIALOG
*
*	Functions for modal dialogs.
*/

function ModalDialog(){
}

/* Listeners to be notified when a dialog show. One argument is the dialog id. */
ModalDialog.showListeners = [];

/* Listeners to be notified when a dialog hides. One argument is the dialog id. */
ModalDialog.hideListeners = [];

/* Shows a modal dialog. Element should be a jQuery dialog element. */
ModalDialog.show = function(element){
	var background = element.parent();
	background.addClass('visible').removeClass('hiding');

	for (let listener of ModalDialog.showListeners){
		listener(element[0].id);
	}
}

/* Dismisses a modal dialog. Element should be a jQuery dialog element. Returns whether the dialog was hidden. */
ModalDialog.hide = function(element){
	var background = element.parent();
	if (!background.hasClass('visible')) {
		//	Not visible
		return false;
	}
	const transitionEvent = 'webkitTransitionEnd transitionend';
	background.removeClass('visible').addClass('hiding').on(transitionEvent, function(){
		$(this).removeClass('hiding').off(transitionEvent);
	});

	for (let listener of ModalDialog.hideListeners){
		listener(element[0].id);
	}

	return true;
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