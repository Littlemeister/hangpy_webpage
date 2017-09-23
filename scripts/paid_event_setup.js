/**
*	PAID EVENT SETUP
*
*	Functions for setting up a pending paid event.
*/

function PaidEventSetup(){}

PaidEventSetup.startAmount = 25;
PaidEventSetup.amountIncrement = 25;
PaidEventSetup.scrollSteps = 0;

$(function(){
	
	//	Setup invest spinner
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
		
		PaidEventSetup.scrollSteps += up ? 1 : -1;
		
		//	Resets children
		investSpinner.html(investSpinner.html());
		
		investSpinner.find('li')
			.addClass(liClass)
			.one('animationend', function(){
				
				$(this).removeClass(liClass);
				PaidEventSetup.setSpinnerValues();
			
			});
		
		e.preventDefault();
		
		return true;
	});
});

/**
*	Sets the value for each row in the invest spinner.
*/
PaidEventSetup.setSpinnerValues = function(){
	$('#invest_num_spinner li').each(function(i, e){
		i += PaidEventSetup.scrollSteps;
		
		e.innerText = (PaidEventSetup.startAmount + PaidEventSetup.amountIncrement * i)
			.toLocaleString();
	});
}