<?php

/**
*	PAID EVENT SETUP
*/

?>


<main id="paid_event_setup">
	<img src="assets/paid_setup_cover.jpg">
	
	<div class="padded">
		<h3>Ge <span class="paid_event_name"></span> en rejäl boost.</h3>

		<p>När ditt event har en stjärna bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  ipsum dolor    ipsum dolor   ipsum dolor   ipsum dolor   ipsum dolor   ipsum dolor   ipsum dolor   ipsum dolor   ipsum dolor   ipsum dolor   Give us your money. 
	</p>
	</div>
	
	<section>
		<div class="padded">
			<div>
				<img id="icon">
				<?php

				echo $from_lang([
					"en" => "Event to market",
					"se" => "Evenemang att marknadsföra"
				]);

				?>
			</div>
		</div>
		
		<div id="event_cover" style="background-image: url('http://partlight.tech/user_content/hangpy/football.jpg')">
			<h4 class="paid_event_name">Event name</h4>
		</div>
		
		<div class="padded">
		
			<ul id="event_info">
				<li><img class="icon" src="assets/ic_location.png" alt="Location"><span class="paid_event_activity"></span> på <span class="paid_event_address"></span></li>
				<li><img class="icon" src="assets/ic_start.png" alt="Location"><span class="paid_event_duration"></span></li>
			</ul>
			
		</div>
	</section>
	
	<div class="padded">
		<section>
			<div>
				<img id="icon">
				<?php

				echo $from_lang([
					"en" => "Investment",
					"se" => "Investering"
				]);

				?>
			</div>
			<div id="invest_input_c">
				<ul id="invest_num_spinner"></ul>
				<div>
					<a id="invest_scroll_up" style="width:24px;height:24px;display:inline-block;background:yellow"></a>
					<a id="invest_scroll_down" style="width:24px;height:24px;display:inline-block;background:yellow"></a>
					<p id="invest_currency">SEK</p>
				</div>
			</div>
		</section>

		<section>
			<h3>
				<?php

				echo $from_lang([
					"en" => "All lookin' good?",
					"se" => "Allt ser bra ut?"
				]);

				?>
			</h3>
			<div>
				<img id="icon">Investering
			</div>
		</section>

		<button id="confirm_paid_event">
		<?php

		echo $from_lang([
			"en" => "Market",
			"se" => "Marknadsför"
		]);

		?>
		</button>
	</div>
</main>