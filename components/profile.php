<section id="profile_page" class="page">
	<div id="profile">
		<section id="personal_section">

			<input id="profile_pic_file" type="file" class="hidden" accept="image/jpeg,image/png,image/gif,image/bmp,image/jpg">
			<div id="profile_picture"></div>
			<div class="profile_pic_options">
				<button id="capture_profile_pic">
					<?php
					
					echo $from_lang([
						"en" => "Take picture",
						"se" => "Ta bild"
					]);
			
					?>
				</button>
				<button id="change_profile_pic">
					<?php
					
					echo $from_lang([
						"en" => "Choose picture",
						"se" => "Välj bild"
					]);
			
					?>
				</button>
			</div>

			<div id="name_wrap">
				<h2 id="full_name">Name</h2>
				<h3 id="phone_number">+46000000000</h3>
				<label for="display_name">
					<?php
					
					echo $from_lang([
						"en" => "Display name",
						"se" => "Visningnamn"
					]);
			
					?>
				</label>
				<input id="display_name" type="text" placeholder="Add a display name" autocomplete="off" spellcheck="false">
			</div>

			<nav class="tab_nav">
				<ul>
					<li id="my_events_nav">
					<?php
					
					echo $from_lang([
						"en" => "My Events",
						"se" => "Mina evenemang"
					]);
			
					?>
					</li>
					<li id="achievements_nav">
					<?php
					
					echo $from_lang([
						"en" => "Achievements",
						"se" => "Framsteg"
					]);
			
					?>
					</li>
					<li id="settings_nav">
					<?php
					
					echo $from_lang([
						"en" => "Settings",
						"se" => "Inställningar"
					]);
			
					?>
					</li>
					<div class="nav_underline"></div>
				</ul>
			</nav>

		</section>

		<section id="my_events_section" class="section">
			<div class="no_events center" style="display:none">
				<figure>  
					<img src="assets/no_events.png" alt="Empty catbowl">
					<figcaption class="caption">
					<?php
					
					echo $from_lang([
						"en" => "Join or <a>create</a> an event and it will<br>show up here.",
						"se" => "Häng med eller <a>skapa</a> ett evenemang, då<br>visas det här."
					]);

					?>
					</figcaption>
				</figure>
			</div>
			<div id="my_events">
				<?php

				$loading_id="my_events_loading";
				include 'components/loading.php';

				?>
			</div>
		</section>

		<section id="achievements_section" class="section">
			
			<?php

			$loading_id="achievements_loading";
			include 'components/loading.php';

			?>
			
			<p class="percent"></p>
			<div id="achievements_progress">
				<div></div>
			</div>
			<div id="achievements">
			</div>

		</section>

		<section id="settings_section" class="section">
			<div>
				<input id="lang_en" type="radio" name="lang" data_lang="en"
					<?php
						
					echo $from_lang([
						"en" => "checked",
						"se" => ""
					]);
			
					?>>
				<label for="lang_en" class="inline">English</label>

				<input id="lang_se" type="radio" name="lang" data_lang="se"
					<?php
						
					echo $from_lang([
						"en" => "",
						"se" => "checked"
					]);
			
					?>>
				<label for="lang_se" class="inline">Svenska</label>
			</div>
			<div>
			<button id="apply_language">
			<?php
				
			echo $from_lang([
				"en" => "Reload and apply",
				"se" => "Ladda om och verkställ"
			]);
	
			?>
			</button>
			</div>

			<input id="phone_num_hidden" type="checkbox">
			<label for="phone_num_hidden" class="inline">
				<?php
				
				echo $from_lang([
					"en" => "Publicly show my number",
					"se" => "Visa mitt nummer offentligt"
				]);
		
				?>
			</label>
			
			<label for="bio">
				<?php
				
				echo $from_lang([
					"en" => "Motto",
					"se" => "Motto"
				]);
		
				?>
			</label>
			<textarea id="bio"></textarea>
			
			<label for="snapchat_input">
				<?php
				
				echo $from_lang([
					"en" => "Snapchat handle",
					"se" => "Snapchatnamn"
				]);
		
				?>
			</label>
			<input id="snapchat_input" type="text" spellcheck="false">
			<div style="margin-top:36px">
				<button id="sign_out">
					<?php
					
					echo $from_lang([
						"en" => "Sign out",
						"se" => "Logga ut"
					]);

					?>
				</button>
				<button id="delete_account" class="danger">
					<?php
					
					echo $from_lang([
						"en" => "Delete account",
						"se" => "Ta bort konto"
					]);

					?>
				</button>
			</div>
		</section>

	</div>
</section>
<div class="modal_bg">

	<div id="confirm_delete_account" class="dialog">
		<h2>
			<?php
			
			echo $from_lang([
				"en" => "Moving on?",
				"se" => "Dags för flytt?"
			]);

			?>
		</h2>
		<p>
			<?php
			
			echo $from_lang([
				"en" => "We're sorry to see you go. After 7 days your account will be deleted, but you may return before that.",
				"se" => "Vi förstår om du vill gå vidare med annat. Efter 7 dagar tas ditt konto bort, men du kan alltid komma tillbaka innan dess."
			]);

			?>
		</p>
		<div class="confirm_c">
			<button class="confirm danger">
				<?php
				
				echo $from_lang([
					"en" => "Delete account",
					"se" => "Ta bort konto"
				]);

				?>
			</button>
		</div>
	</div>

</div>

<div class="modal_bg">
	<div id="camera_capture" class="dialog">
		<div id="camera_container">
			<div id="camera_circle_overlay"></div>
			<video class="target" autoplay></video>
			<canvas id="camera_img_target" width=640 height=480></canvas>
		</div>
		<div class="center">
			<button id="camera_capture_accept">
				<?php
					
				echo $from_lang([
					"en" => "Use photo",
					"se" => "Använd foto"
				]);

				?>
			</button>
			<button id="camera_capture_snap">
				<?php
					
				echo $from_lang([
					"en" => "Capture",
					"se" => "Ta bild"
				]);

				?>
			</button>
		</div>
	</div>
</div>