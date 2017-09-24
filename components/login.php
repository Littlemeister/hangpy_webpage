<?php

/**
*	LOGIN
*/

?>

<div class="visible modal_bg">
	<div id="login_dialog" class="dialog">
		<div id="login_background">
		
			<h2>
			<?php

			echo $from_lang([
				"en" => "Welcome",
				"se" => "Välkommen"
			]);

			?>
			</h2>
			<p>
			<?php

			echo $from_lang([
				"en" => "Attend any event, meet new people.<br>Your phone number is all that's needed to get going!",
				"se" => "Delta i evenemang och träffa nya människor.<br>Ditt telefonnummer är det enda som behövs för att komma igång!"
			]);

			?>	
			</p>
			
		</div>
		
		<div id="login_inputs">
			<div id="pre_verification">
				<div id="phone_c">
					<label>
						<?php

						echo $from_lang([
							"en" => "Sign in with your phone number",
							"se" => "Logga in med ditt telefonnummer"
						]);

						?>	
					</label>
					<p>+46</p>
					<input id="login_phone" type="text" placeholder="Phone number" maxlength="10">
					<a id="login_phone_action">
						<img class="disabled icon" src="assets/ic_continue.png" alt="Continue">
					</a>
				</div>
				<div id="login_verification">
					<label>
						<?php

						echo $from_lang([
							"en" => "Great! Now check your phone for a verification code",
							"se" => "Härligt! Kolla dina meddelanden efter en verifieringskod"
						]);

						?>
					</label>
					<input type="text" placeholder="Verification code">
					<a id="submit_verification">
						<img class="disabled icon" src="assets/ic_continue.png" alt="Continue">
					</a>
				</div>
			</div>
			
			<div id="incomplete_profile_c">
				<input id="login_name_input" type="text">
				<button id="complete_profile_btn">
					<?php

					echo $from_lang([
						"en" => "Start hanging out",
						"se" => "Börja umgås"
					]);

					?>
				</button>
			</div>
		</div>
		
		<a id="login_privacy">
		<?php

		echo $from_lang([
			"en" => "Privacy Policy",
			"se" => "Sekretesspolicy"
		]);

		?>
		</a>
	</div>
</div>