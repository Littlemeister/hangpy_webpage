<?php

/**
*	PAID EVENT SETUP
*/

?>


<section id="paid_event_setup_page" class="page">
	<img src="assets/paid_setup_cover.jpg" class="cover">
	
	<h3>Ge <span class="paid_event_name"></span> en rejäl boost.</h3>

	<p>När ditt event har en stjärna bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  bla bla bla  ipsum dolor    ipsum dolor   ipsum dolor   ipsum dolor   ipsum dolor   ipsum dolor   ipsum dolor   ipsum dolor   ipsum dolor   ipsum dolor   Give us your money. 
</p>
	
	<section>
		<div>
			<img id="icon">
			<?php

			echo $from_lang([
				"en" => "Event to market",
				"se" => "Evenemang att marknadsföra"
			]);

			?>
		</div>
		
		<div id="event_cover" class="cover">
			<h4 class="paid_event_name">Event name</h4>
		</div>
		
		<ul id="event_info" class="event_info_list">
			<li><img class="icon" src="assets/ic_location.png" alt="Location"><span class="paid_event_activity"></span> på <span class="paid_event_address"></span></li>
			<li><img class="icon" src="assets/ic_start.png" alt="Location"><span class="paid_event_duration"></span></li>
		</ul>
	</section>
	
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
			<div id="invest_currency">
				<p>SEK</p>
			</div>
			
			<p id="investment_position">
			<?php

			echo $from_lang([
				"en" => "Event will fall in <span></span> place on frontpage",
				"se" => "Evenemanget visas på <span></span> plats på framsidan"
			]);

			?>
			</p>
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
		
		<nav class="tab_nav">
			<ul>
				<li id="paypal_payment_nav">PayPal</li>
				<li id="card_payment_nav">
				<?php
				
				echo $from_lang([
					"en" => "Card payment",
					"se" => "Kortbetalning"
				]);
		
				?>
				</li>
				<div class="nav_underline"></div>
			</ul>
		</nav>
	</section>

	<button id="confirm_paid_event">
	<?php

	echo $from_lang([
		"en" => "Market",
		"se" => "Marknadsför"
	]);

	?>
	</button>
</section>