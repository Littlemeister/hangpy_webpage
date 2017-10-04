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

$(function(){
	//	Setup invest spinner
	PaidEventSetup.setupInvestmentSpinner();
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