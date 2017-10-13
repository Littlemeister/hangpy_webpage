<?php

/**
*	LOGIN
*/

?>

<div class="modal_bg">
	<div id="sign_in_dialog" class="dialog">
		<div id="login_background">
			<p>
			<?php

			echo $from_lang([
				"en" => "Attend any event, meet new people.",
				"se" => "Delta i evenemang och träffa nya människor."
			]);

			?>	
			</p>

			<p>
			<?php

			echo $from_lang([
				"en" => "Your phone number is all that's needed to get going!",
				"se" => "Ditt telefonnummer är det enda som behövs för att komma igång!"
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
					<input id="login_phone" type="text" spellcheck="false" placeholder="<?php

					echo $from_lang([
						"en" => "Phone number",
						"se" => "Telefonnummer"
					]);

					?>" maxlength="10">
					<a id="login_phone_action">
						<div class="disabled icon"></div>
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
					<input type="text" spellcheck="false" autocorrect="off" maxlength="6" placeholder="<?php

						echo $from_lang([
							"en" => "Verification code",
							"se" => "Verifieringskod"
						]);

						?>">
					<a id="submit_verification">
						<img class="disabled icon" src="assets/ic_continue.png" alt="<?php

						echo $from_lang([
							"en" => "Continue",
							"se" => "Fortsätt"
						]);

						?>">
					</a>
				</div>
			</div>
			
			<div id="incomplete_profile_c">
				<p>
				<?php

				echo $from_lang([
					"en" => "Almost there! Let's setup your profile.",
					"se" => "Nästan där! Din profil saknar ditt fullständiga namn."
				]);

				?>
				</p>
				<label>
				<?php

				echo $from_lang([
					"en" => "Full name",
					"se" => "Fullständigt namn"
				]);

				?>
				</label>
				<input id="login_name_input" type="text">
				<button id="complete_profile_btn">
				<?php

				echo $from_lang([
					"en" => "Find events!",
					"se" => "Hitta evenemang!"
				]);

				?>
				</button>
			</div>
		</div>
		
		<a id="login_privacy" href="privacy/" target="_blank">
		<?php

		echo $from_lang([
			"en" => "Privacy Policy",
			"se" => "Sekretesspolicy"
		]);

		?>
		</a>
	</div>
</div>