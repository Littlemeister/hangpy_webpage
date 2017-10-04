<section id="frontpage_page" class="page">
  <div class="frontpage_outside_tools">

    <!-- Search articles -->
    <div class="frontpage_tool_search_wrapper">
      <input id="frontpage_tool_search" type="text" value="" placeholder="<?php
			
			echo $from_lang([
				"en" => "bbq, shopping, video games...",
				"se" => "bada, shoppa, lunch..."
			]);

			?>">
      <img id="frontpage_search_icon" src="pic/magnify.png" alt="search_icon">
    </div>

    <!-- Create articles -->
    <button id="create_event_btn">  
			<?php
			
			echo $from_lang([
				"en" => "Create",
				"se" => "Skapa"
			]);

      ?>
    </button>

    <!-- Explore trending articles -->
    <button id="discover_categories_btn">
			<?php
			
			echo $from_lang([
				"en" => "Discover",
				"se" => "Upptäck"
			]);

      ?>
    </button>

  </div>

  <!-- Main articles -->
  <div class="frontpage_main_articles_wrapper">
    <div class="frontpage_inside_tools">
      <h1 id="events_header">
        Main events
      </h1>
      <!-- Filter articles -->
      <button id="event_filters_btn" title="<?php
			
			echo $from_lang([
				"en" => "Filter events",
				"se" => "Filtrera evenemang"
			]);

      ?>"><img src="assets/ic_filter.png" alt="Filter">
      </button>
      
      <ul id="event_filters">
        <li id="filter_location">
          <figure>
            <figcaption>Location</figcaption>
          </figure>
        </li>
        <li id="filter_attendees">
          <figure>
            <figcaption>Attendees</figcaption>
          </figure>
        </li>
        <li id="filter_start_time">
          <figure>
            <figcaption>Starts</figcaption>
          </figure>
        </li>
      </ul>
    </div>
    
    <div id="article_previews">
    </div>

    <div id="frontpage_no_events" class="center" style="display:none">
      <figure>  
        <img src="assets/no_events.png" alt="Empty catbowl">
        <figcaption class="caption">
          <?php
          
          echo $from_lang([
            "en" => "Not much up right now. Check your filters<br>or <a>create your own event.</a>",
            "se" => "PLACEHOLDER"
          ]);

          ?>
        </figcaption>
      </figure>
    </div>

    <button id="fetch_next_page">Load more</button>
    
    <?php
      //  Loading indicator element
    
      $loading_id = 'events_loading';
      require 'loading.php';
    ?>

  </div>

  <!-- Paid articles -->
  <div id="paid_events">
    <h1>
			<?php
			
			echo $from_lang([
				"en" => "Featured",
				"se" => "Utvalt"
			]);

      ?>
    </h1>
    
    <div id="frontpage_no_paid_events" class="center" style="display:none">
      <figure>  
        <img src="assets/no_events.png" alt="Empty catbowl">
        <figcaption class="caption">
          <?php
          
          echo $from_lang([
            "en" => "Make your event seen!<br>Market it today.</a>",
            "se" => "PLACEHOLDER"
          ]);

          ?>
        </figcaption>
      </figure>
    </div>

  </div>
	

</section>

<div class="modal_bg">

    <div id="trending_cat_dialog" class="dialog dark">
      <div>
        <?php
        
        $loading_id = 'trending_cat_loading';
        $loading_dark = true;
        include 'components/loading.php';
        
        ?>
        
        <div id="trending_cat_container">
        
        </div>
      </div>
    </div>
  </div>
	
</div>