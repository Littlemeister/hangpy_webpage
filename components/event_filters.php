<?php

/**
*	FILTERS
*
*	Filter dialogs.
*/

?>

<div class="modal_bg">
	<div id="location_filter_dialog" class="dialog">
		<div id="location_map_c">
			<div id="location_filter_map"></div>
			<input id="locaiton_filter_find" type="text" placeholder="Find place">
		</div>
		
		<h2>Filter events within</h2>
		<p id="distance_label">/p>

		<div>
			<input id="location_distance_input" type="range" min="500" max="100000" step="500" />
		</div>
		
		<div>
			<button id="location_filter_confirm" class="confirm_btn">Confirm</button>
		</div>
			
		<div class="close_dialog">
		</div>
	</div>
</div>

<div class="modal_bg">
	<div id="attendees_filter_dialog" class="dialog">
		<h2>Filter events with</h2>
		<div>
			
			<?php
			
			$dropdown = function($id) {
				return <<<EOD
				
				<select id="$id">
					<option>10</option>
					<option>20</option>
					<option>30</option>
					<option>40</option>
					<option>50</option>
					<option>70</option>
					<option>100</option>
					<option>200</option>
					<option>300</option>
				</select>
				
EOD;
			};
			
			echo $dropdown("attendees_filter_min");
			echo "<p>to</p>";
			echo $dropdown("attendees_filter_max");
			
			?>
		
		</div>
		
		<p>attendees</p>
		
		<div>
			<button id="attendees_filter_confirm" class="confirm_btn">Confirm</button>
		</div>
			
		<div class="close_dialog">
		</div>
	</div>
</div>

<div class="modal_bg">
	<div id="start_filter_dialog" class="dialog">
		<h2>Filter events starting</h2>
		
		<div>
			
			<input type="checkbox" id="start_filter_checkbox" checked>
			
			<div id="start_filter_input_c">
				<p>around</p>
				<input type="time" id="star_filter_input">
			</div>
			
		</div>
		
		<div>
			
			<span>within</span>
			<select id="start_filter_days">
				<option>1</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
				<option>5</option>
				<option>6</option>
			</select>
			<span>dags</span>
			
		</div>
		
		<div>
			<button id="start_filter_confirm" class="confirm_btn">Confirm</button>
		</div>
		
		<div class="close_dialog">
		</div>
	</div>
</div>