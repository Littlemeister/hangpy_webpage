/**
*	LOGIN
*
*	Script for the login component.
*/

function Login(){}

const LOGIN_PHONE_LENGTH = 9;

Login.submitPhone = function(){
	const phoneAction = $('#login_phone_action .icon').addClass('disbled');
	var phone = $('#login_phone').val();
	
	var countryCode = "+46";
	
	if (phone.startsWith('0')) {
		phone = phone.substring(1);
	}
	
	if (phone.length != LOGIN_PHONE_LENGTH) {
		//	Invalid phone number
		return;
	}
	
	phone = countryCode + phone;

	User.current.phoneNumber = phone;
	
	User.queueVerification(phone, function(){
		if (Login.resendingVerification) {
			Notification.show(Strings.signInDialog.resentVerification);
			Login.resendingVerification = false;
		}

		//	Did query verification
		$('#login_inputs').addClass('verification');
		
		phoneAction.attr('src', 'assets/ic_refresh.png').removeClass('disabled');
	});
}

/**
 * Resends a verification code to the number provided
 */
Login.resendVerification = function(){
	Login.resendingVerification = true;
	Login.submitPhone();
}

Login.submitVerification = function(){
	var verification = $('#login_verification input').val();
	
	User.checkVerification(verification, function(status){
		switch (status) {
				
			case STATUS_SIGN_UP:
				Login.onIncompleteProfile();
				break;
				
			case SUCCESS:
				Login.onSignedIn();
				break;
				
			case FAILED:
				Login.onInvalidVerification();
				break;
				
		}
	});
}

Login.onInvalidVerification = function(){
	$('#login_verification label').fadeOut(250, function(){
		$(this).text(Strings.signInDialog.invalidVerification).addClass('invalid').fadeIn(250);
	});
}

Login.onIncompleteProfile = function(){
	$('#login_inputs').addClass('incomplete_profile');
}

/**
*	Submits incomplete profile data.
*/
Login.completeProfile = function(){
	var fullName = $('#login_name_input').val();
	
	User.updateProfile({
		full_name: fullName
	}, function(){
		User.fetchData(function(status){
			Login.onSignedIn();
		});
	});
}

Login.onSignedIn = function(){
	ModalDialog.hide($('#sign_in_dialog'));
	
	Notification.show("Welcome, $!".replace('$', User.current.first_name));
}

$(function(){
	//	Enter to confirm
	var phoneAction = $('#login_phone_action .icon');
	var phoneInput = $('#login_phone').keyup(function(e){
		if (e.keyCode == 13){
			//	Enter pressed
			$('#login_phone_action').click();
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		
		//	Validate phone
		var length = this.value.length;
		var valid = length == LOGIN_PHONE_LENGTH || length == LOGIN_PHONE_LENGTH + 1;
		
		phoneAction.toggleClass('disabled', !valid);
	});
	
	phoneInput[0].onkeypress = function(e){
		//	Numeric filter
		return e.charCode >= 48 && e.charCode <= 57
	};

	//	Verification code input
	$('#login_verification input').keyup(function(e){
		if (e.keyCode == 13){
			//	Enter pressed
			$('#submit_verification').click();
		}
	});
	
	$('#login_phone_action').click(function(){
		if ($(this).hasClass('disabled')){
			return;
		}

		//	Continue to verification or resend verification
		if ($('#login_inputs').hasClass('verification')) {
			//	Resend
			Login.resendVerification();
		} else {
			Login.submitPhone();
		}
	});
	
	$('#submit_verification').click(function(){
		Login.submitVerification();
	});
	
	$('#complete_profile_btn').click(function(){
		Login.completeProfile();
	});

	ModalDialog.showListeners.push(function(sectionId){
		if (sectionId == 'sign_in_dialog'){
			//	Reset form
			const inputs = $('#login_inputs').removeClass('verification');

			inputs.find('#login_phone').val('');
		}
	});

	//	Enter to submit
	$('#login_name_input').keyup(function(e){
		if (e.keyCode == 13){
			//	Enter pressed
			$('#complete_profile_btn').click();
		}
	});
});