/**
*	LOGIN
*
*	Script for the login component.
*/

function Login(){}

Login.submitPhone = function(){
	var phone = $('#login_phone').val();
	
	var countryCode = "+46";
	
	if (phone.startsWith('0')) {
		phone = phone.substring(1);
	}
	
	phone = countryCode + phone;
	
	User.queueVerification(phone, function(status){
		//	Did query verification
		$('#login_inputs').addClass('verification');
		
		$('#login_phone_action .icon').attr('src', 'assets/ic_refresh.png');
	});
}

Login.resendVerification = function(){
	
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
		Login.onSignedIn();
	});
}

Login.onSignedIn = function(){
	ModalDialog.hide($('#login_dialog'));
	
	Notification.show("Welcome, $!".replace('$', User.current.first_name));
}

$(function(){
	//	Enter to confirm
	$('#login_phone').on('keyup', function(e){
		if (e.keyCode == 13){
			//	Enter pressed
			$('#login_phone_action').click();
			e.preventDefault();
			e.stopPropagation();
		}
	});
	
	$('#login_phone_action').click(function(){
		//	Continue to verification or resend verification
		
		Login.submitPhone();
	});
	
	$('#submit_verification').click(function(){
		Login.submitVerification();
	});
	
	$('#complete_profile_btn').click(function(){
		Login.completeProfile();
	});
});