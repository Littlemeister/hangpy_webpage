<?php

/**
*	CREATE EVENT
*/

?>

<section id="create_event_page" class="form page">
	<form action="get">
		<a id="create_event_back">
			<?php
			
			echo $from_lang([
				"en" => "Return to events",
				"se" => "Tillbaka till evenemang"
			]);

			?>
		</a>

		<h1>
			<?php
			
			echo $from_lang([
				"en" => "Create Event",
				"se" => "Skapa evenemang"
			]);

			?>
		</h1>
		
		<h2>
			<?php
			
			echo $from_lang([
				"en" => "Where?",
				"se" => "Var?"
			]);

			?>
		</h2>

		<input type="text" id="create_event_map_search"
		data_disable_enter
		spellcheck="false"
		placeholder="<?php
			
			echo $from_lang([
				"en" => "Find address",
				"se" => "Hitta adress"
			]);

			?>">
		<div id="create_event_map"></div>
		
		<h2>
			<?php
			
			echo $from_lang([
				"en" => "When?",
				"se" => "När?"
			]);

			?>
		</h2>

		<div class="center">
			<div class="event_start_c">
				<input id="event_start_t_input" type="time" required class="center event_duration_time">
				<select id="event_start_d_input" class="center event_duration_date"></select>
			</div>
			<p id="event_duration_mid">
				<?php
				
				echo $from_lang([
					"en" => "until",
					"se" => "tills"
				]);

				?>
			</p>
			<div class="event_start_c">
				<input id="event_end_t_input" type="time" required class="event_duration_time">
				<select id="event_end_d_input" class="event_duration_date"></select>
			</div>
			
			<p id="event_duration"></p>
		</div>

		
		<h2>
			<?php
			
			echo $from_lang([
				"en" => "What's up?",
				"se" => "Vad händer?"
			]);

			?>
		</h2>

		<h3>
			<?php
			
			echo $from_lang([
				"en" => "Activity",
				"se" => "Aktivitet"
			]);

			?>
		</h3>

		<div class="center">
			<img alt="">

			<div id="event_name_c">
				<div id="event_name_suggestions" class="gone hidden">
					<h3>
					<?php
					
					echo $from_lang([
						"en" => "Suggestions",
						"se" => "Förslag"
					]);

					?>
					</h3>
					<ul></ul>
				</div>
				<input id="event_category_input" type="text" autocomplete="off"
				placeholder="<?php
				
					echo $from_lang([
						"en" => "bbq, golf, shopping",
						"se" => "grilla, bada, shoppa"
					]);

					?>"> 
			</div>
		</div>

		
		<h2>
			<?php
			
			echo $from_lang([
				"en" => "Name your event",
				"se" => "Namnge"
			]);

			?> *
		</h2>
		<div class="center">
			<input id="event_name_input" type="text" autocomplete="off"> 
		</div>
		
		<h2>
			<?php
			
			echo $from_lang([
				"en" => "Put up some photos!",
				"se" => "Put up some photos!"
			]);

			?>
		</h2>

		<input id="event_gallery_file" type="file" class="hidden">
		<div class="event_gallery big" data_index="0">
			<a class="remove"></a>
		</div>
		<div class="center">
			<div class="event_gallery small disabled" data_index="1">
				<a class="remove"></a>
			</div>
			<div class="event_gallery small disabled" data_index="2">
				<a class="remove"></a>
			</div>
			<div class="event_gallery small disabled" data_index="3">
				<a class="remove"></a>
			</div>
		</div>

		<div>
			<input id="event_cat_gallery_input" type="checkbox" checked>
			<label for="event_cat_gallery_input">
				<?php
				
				echo $from_lang([
					"en" => "Use photos from activity",
					"se" => "Använd foton från aktivit"
				]);

				?>
			</label>
		</div>
		
		
		<h2>
			<?php
			
			echo $from_lang([
				"en" => "Anything else others need to know?",
				"se" => "Något annat andra behöver veta?"
			]);

			?>
		</h2>

		<textarea id="event_description_input" class="auto_grow"
		placeholder="<?php
			
			echo $from_lang([
				"en" => "Nice weather coming up? Is public transport available?",
				"se" => "Hur blir vädret? Går det bussar till platsen?"
			]);

			?>"></textarea>


		<p id="invalid_field_msg">
			Add atleast one photo
		</p>

		<div class="right">
			<button id="event_create_submit" type="submit" disabled>	
				<?php
					
				echo $from_lang([
					"en" => "CREATE EVENT",
					"se" => "SKAPA EVENEMANG"
				]);

				?>
			</button>
		</div>
	</form>
</section>
