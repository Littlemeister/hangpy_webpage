<?php

/**
*	PAID EVENT SETUP
*/

?>


<section id="paid_event_setup_page" class="page">
	<img src="assets/paid_setup_cover.jpg" class="cover">
	
	<h3>
	<?php
	
	echo $from_lang([
		"en" => "Ge <span class='paid_event_name'></span> en rejäl boost.",
		"se" => "Boost <span class='paid_event_name'></span>."
	]);

	?>
	</h3>

	<p>
	<?php
	
	echo $from_lang([
		"en" => "Once your event has a star, others will see it ",
		"se" => "Klicka nedanför för att autentisera med PayPal."
	]);

	?>
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

		<section id="paypal_payment_section">
			<div class="center">
				<h4 id="paypal_header">
				<?php
				
				echo $from_lang([
					"en" => "Click below to authorize with PayPal.",
					"se" => "Klicka nedanför för att autentisera med PayPal."
				]);
		
				?>
				</h4>
				<div id="paypal_auth"></div>
			</div>
		</section>
		<section id="card_payment_section">
			<div id="card_auth"></div>
		</section>
	</section>

	<button id="paid_event_submit">
	<?php

	echo $from_lang([
		"en" => "Market",
		"se" => "Marknadsför"
	]);

	?>
	</button>
</section>

<div class="modal_bg">
	<div id="paid_event_confirm" class="dialog">
		<h2>
		<?php
		
		echo $from_lang([
			"en" => "Confirm marketing",
			"se" => "Bekräfta marknadsföring"
		]);

		?>
		</h2>
		<table>
			<tr>
				<td>
				<?php
				
				echo $from_lang([
					"en" => "Event",
					"se" => "Evenemang"
				]);

				?>
				</td>
				<td>
					<span class="paid_event_name"></span>
				</td>
			</tr>
			<tr>
				<td>
				<?php
				
				echo $from_lang([
					"en" => "Investment",
					"se" => "Investering"
				]);

				?>
				</td>
				<td>
					<span class="investment"></span>kr
				</td>
			</tr>
			<tr>
				<td>
				<?php
				
				echo $from_lang([
					"en" => "Address",
					"se" => "Faktureringsadress"
				]);

				?>
				</td>
				<td>
					<span id="address"></span>kr
				</td>
			</tr>
			<tr>
				<td>
				<?php
				
				echo $from_lang([
					"en" => "City",
					"se" => "Stad"
				]);

				?>
				</td>
				<td>
					<span id="city"></span>kr
				</td>
			</tr>
			<tr>
				<td>
				<?php
				
				echo $from_lang([
					"en" => "Orderer",
					"se" => "Beställare"
				]);

				?>
				</td>
				<td>
					<span id="orderer"></span>kr
				</td>
			</tr>
		</table>
		<div class="confirm_c">
			<button class="confirm">
			<?php
			
			echo $from_lang([
				"en" => "Confirm",
				"se" => "Bekräfta"
			]);

			?>
			</button>
		</div>
	</div>
</div>

<div class="modal_bg">
	<div id="paid_event_post" class="dark dialog">
		<h2>
		<?php
		
		echo $from_lang([
			"en" => "Event marketed for <span></span>kr",
			"se" => "Evenemanget marknadsfört för <span></span>kr"
		]);

		?>
		</h2>
		<div class="article_preview">
			<div>
				<h2 class="event_name overlay"></h2>
				<div class="cover"></div>
			</div>
		</div>
		<div class="buttons">
			<button id="paid_to_info">
			<?php
			
			echo $from_lang([
				"en" => "Go to event",
				"se" => "Visa evenemang"
			]);

			?>
			</button>
			<button id="paid_to_frontpage">
			<?php
			
			echo $from_lang([
				"en" => "View on frontpage",
				"se" => "Visa på framsidan"
			]);

			?>
			</button>
		</div>
	</div>
</div>