<section id="profile_page" class="page">
	<div id="profile">
		<section id="personal_section">

			<input id="profile_pic_file" type="file" class="hidden">
			<div id="profile_picture"></div>
			<div class="profile_pic_options">
				<button id="capture_profile_pic">Take picture</button>
				<button id="change_profile_pic">Change picture</button>
			</div>

			<div id="name_wrap">
				<h2 id="full_name">Name</h2>
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

			<div class="picture_settings">
				<!-- INTE KLAR INGEN CSS INGENTING -->
			</div>

			<section id="nav_wrapper">
				<nav>
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
						<div id="nav_underline"></div>
					</ul>
				</nav>
			</section>

		</section>

		<section id="my_events_section" class="section">
			<div id="my_events">
				<?php

				$loading_id="my_events_loading";
				include 'components/loading.php';

				?>
			</div>
		</section>

		<section id="achievements_section" class="section">
			<article>
				<div class="profile_achivement_pic"></div>
				<h3>You are a social maniac - 500 events achived!</h3>
			</article>
			<article>
				<div class="profile_achivement_pic"></div>
				<h3>You are a social maniac - 500 events achived!</h3>
			</article>
			<article>
				<div class="profile_achivement_pic"></div>
				<h3>You are a social maniac - 500 events achived!</h3>
			</article>
		</section>

		<section id="settings_section" class="section">
			<p class="phone_num"></p>

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
					"en" => "Describe yourself",
					"se" => "Beskriv dig själv"
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
				<button id="delete_account">
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
				"se" => "Logga ut"
			]);

			?>
		</h2>
		<p>
			<?php
			
			echo $from_lang([
				"en" => "We're sorry to see you go. After 7 days your account will be deleted, but you may return before that.",
				"se" => "Bla bla bla bla"
			]);

			?>
		</p>
		<button class="confirm">
			<?php
			
			echo $from_lang([
				"en" => "Delete account",
				"se" => "Ta bort konto"
			]);

			?>
		<button>
	</div>

</div>

<div class="modal_bg">
	<div id="camera_capture" class="modal">
		<video class="target"></video>
	</div>
</div>