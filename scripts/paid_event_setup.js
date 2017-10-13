/**
*	PAID EVENT SETUP
*
*	Functions for setting up a pending paid event.
*/

function PaidEventSetup(){}

/** Starting investment */
PaidEventSetup.startAmount = 25;
PaidEventSetup.amountIncrement = 25;
PaidEventSetup.scrollSteps = 0;


/**
 * Sets up several elements from an event object, and changes the layout to this.
 */
PaidEventSetup.setupFromEvent = function(eventObj){
	PaidEventSetup.eventData = eventObj;

	//	Event name
	$('.paid_event_name').text(eventObj.name);

	//	Cover image
	$('#event_cover').css('background-image', 'url(' + eventObj.base_image_url + eventObj.gallery[0] + ')');

	//	Copy metadata from event info
	$('#event_info').html($('#event_info_meta ul').html());

	GUI.changeLayout($('#paid_event_setup_page'));
}

/**
 * Checks with the server to see in what position the event will fall in with the current investment.
 */
PaidEventSetup.updateInvestmentPosition = function(investment){
	Backend.request('out=investment_position&investment=' + investment, null, function(response){
		$('#investment_position span').text(response + Utils.quantitySuffix(+response));
	});
}

PaidEventSetup.setupInvestmentSpinner = function(){
	var investSpinner = $('#invest_num_spinner');
	
	for (var i = 0; i < 5; i++) {
		$('<li>').appendTo(investSpinner);
	}
	
	PaidEventSetup.setSpinnerValues();
	
	investSpinner.on('mousewheel', function(e){
		
		PaidEventSetup.setSpinnerValues();
		
		var e = window.event || e; // old IE support
		var delta = e.wheelDelta || -e.detail;
		
		var up = delta > 0;
		var liClass = up ? 'up' : 'down';

		if (!up && PaidEventSetup.investment == PaidEventSetup.startAmount) {
			//	Cannot go any lower
			return;
		}

		PaidEventSetup.scrollSteps += up ? 1 : -1;
		PaidEventSetup.investment = investSpinner.find('li:nth-child(' + (3 + (up ? 1 : -1)) + ')')
			.text()
				.replace(',', '');
		
		//	Resets children
		investSpinner.html(investSpinner.html());
		
		//	Only do once
		PaidEventSetup.canSetSpinnerValues = true;
		investSpinner.find('li').removeClass().on('animationend webkitAnimationEnd', function(){
			
			$(this).removeClass();

			if (PaidEventSetup.canSetSpinnerValues){
				PaidEventSetup.setSpinnerValues();
				PaidEventSetup.updateInvestmentPosition(
					PaidEventSetup.investment
				);
				PaidEventSetup.canSetSpinnerValues = false;
			}
		
		}).addClass(liClass);
		
		e.preventDefault();
		
		return true;
	});
}

PaidEventSetup.setupPayPal = function() {
	paypal.Button.render({
		env: 'sandbox',
		commit: true,
		payment: function(){
			Backend.request("action=init_paypal", null, function(response){
				debugger;
			});
		},
		onAuthorize: function(data, actions){
			debugger;
		}
	}, '#paypal_auth');
}

/**
 * Sets up the card payment service.
 */
PaidEventSetup.setupCard = function() {
	let stripe = PaidEventSetup.stripe = Stripe("pk_test_F3lAL3shzlokFtuhUAwZN5Ib");
	let elements = stripe.elements();
	let card = PaidEventSetup.cardElement = elements.create('card', {
		placeholder: Strings.setupPaid.cardPlaceholder
	});
	
	card.mount('#card_auth');
}

/**
 * Executes the payment.
 */
PaidEventSetup.execPayment = function() {
	GUI.showFullscreenLoading();

	if (true) {
		//	Submit card payment
		let stripe = PaidEventSetup.stripe;
		stripe.createToken(PaidEventSetup.cardElement).then(function(result){
			Backend.request("action=exec_card", {
				token_id: result.token.id,
				investment: PaidEventSetup.investment
			}, function(response){
				PaidEventSetup.parseExecPaymentResponse(response, 1);
			});
		});
	}
}

PaidEventSetup.parseExecPaymentResponse = function(response, isCard) {
	GUI.hideFullscreenLoading();
	
	if (true) {
		//	Successful
		PaidEventSetup.onSuccess();
	}
}

/**
 * Propmpts for a confirmation before submitting/paying.
 */
PaidEventSetup.showSubmitConfirm = function() {
	let dialog = $('#paid_event_confirm');
	ModalDialog.show(dialog);
}

/**
 * Called if the paid event setup finished successfully; the event is now marketed.
 */
PaidEventSetup.onSuccess = function() {
	let dialog = $('#paid_event_post');
	let eventPreview = dialog.find('.article_preview');

	let data = PaidEventSetup.eventData;
	eventPreview.find('.event_name').text(data.name);
	eventPreview.find('.cover').css('background-image', 'url(' + data.base_image_url + data.gallery[0] + ')');
	dialog.find('> h2 span').text(PaidEventSetup.investment);

	ModalDialog.show(dialog);
}

/**
 * Sets up the post paid dialog.
 */
PaidEventSetup.setupPostDialog = function(){
	let prefix = '#paid_to_';
	const dialog = $('#paid_event_post');
	$(prefix + 'info').click(function(){
		//	View event info
		ModalDialog.hide(dialog);
		Frontpage.initEventInfo(PaidEventSetup.eventData.id);
	});
	$(prefix + 'frontpage').click(function(){
		//	View on frontpage
		ModalDialog.hide(dialog);

	});
}

/**
 * TODO: Move to tab_nav.js
 */
PaidEventSetup.changeBillingSection = function(sectionId){

	var underlineLeft;
	var nthCurrentNavLi;
	const sectionSuffix = '_payment_section';

	switch (sectionId){
		case 'paypal' + sectionSuffix:
		underlineLeft = '0';

		nthCurrentNavLi = 1;

		break;

		case 'card' + sectionSuffix:
		underlineLeft = '50%';
		
		nthCurrentNavLi = 2;
		break;

		default:
		console.log("Invalid section: " + sectionId);
		return;
	}

	$('#paid_event_setup_page .nav_underline').css('left', underlineLeft);
	var section = $('#' + sectionId);

	if (PaidEventSetup.currentBillingSection){
		if (section == PaidEventSetup.currentBillingSection) {
			//	Not changing section
			return;
		}
		//	Hide old section
		PaidEventSetup.currentBillingSection.hide();
	}

	let baseNavLiSelector = '#profile_page .tab_nav li', baseNavLiClass = 'current';
	$(baseNavLiSelector + '.current').removeClass(baseNavLiClass);
	$(baseNavLiSelector + ':nth-child(' + nthCurrentNavLi + ')').addClass(baseNavLiClass);

	PaidEventSetup.currentBillingSection = section;
	section.show();
}

$(function(){
	//	Setup invest spinner
	PaidEventSetup.setupInvestmentSpinner();
	PaidEventSetup.setupPayPal();
	PaidEventSetup.setupCard();
	PaidEventSetup.setupPostDialog();

	$('#paid_event_submit').click(function(){
		PaidEventSetup.showSubmitConfirm();
	});

	$('#paid_event_confirm .confirm').click(function(){
		PaidEventSetup.execPayment();
	});
});

/**
*	Sets the value for each row in the invest spinner.
*/
PaidEventSetup.setSpinnerValues = function(){
	let spinnerItems = $('#invest_num_spinner li');
	
	spinnerItems.each(function(i, e){
		i += PaidEventSetup.scrollSteps;
		
		let val = PaidEventSetup.startAmount + PaidEventSetup.amountIncrement * i;
		if (val >= PaidEventSetup.startAmount) {
			e.innerText = val.toLocaleString();
			e.classList.remove('hidden');
		} else {
			e.classList.add('hidden');
		}
	});

	let selected = spinnerItems[2];
}