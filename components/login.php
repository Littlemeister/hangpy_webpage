<?php

/**
*	LOGIN
*/

?>

<div class="visible modal_bg">
	<div id="login_dialog" class="dialog">
		<div id="login_background">
		
			<h2>Welcome</h2>
			<p>Attend any event, meet new people.<br>Your phone number is all that's needed to get going!</p>
			
		</div>
		
		<div id="login_inputs">
			<div id="pre_verification">
				<div id="phone_c">
					<label>Sign in with your phone number</label>
					<p>+46</p>
					<input id="login_phone" type="text" placeholder="Phone number" maxlength="10">
					<a id="login_phone_action">
						<img class="disabled icon" src="assets/ic_continue.png" alt="Continue">
					</a>
				</div>
				<div id="login_verification">
					<label>Great! Now check your phone for a verification code</label>
					<input type="text" placeholder="Verification code">
					<a id="submit_verification">
						<img class="disabled icon" src="assets/ic_continue.png" alt="Continue">
					</a>
				</div>
			</div>
			
			<div id="incomplete_profile_c">
				<input id="login_name_input" type="text">
				<button id="complete_profile_btn">Start hanging out</button>
			</div>
		</div>
		
		<a id="login_privacy">Privacy Policy</a>
	</div>
</div>