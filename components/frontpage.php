<section id="frontpage_page" class="page">
  <div class="frontpage_outside_tools">

    <!-- Search articles -->
    <div class="frontpage_tool_search_wrapper">
      <input id="frontpage_tool_search" type="text" value="" placeholder="<?php
			
			echo $from_lang([
				"en" => "Search",
				"se" => "Sök"
			]);

			?>">
      <img id="frontpage_search_icon" src="pic/magnify.png" alt="search_icon">
    </div>

    <!-- Create articles -->
    <button id="create_event_caller">  
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
      <button id="event_filters_btn">Filter</button>
      
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
    
    <div id="frontpage_articles">
    </div>

    <div id="frontpage_no_events" class="center" style="display:none">
    <figure>  
      <img src="assets/no_events.png" alt="Empty catbowl">
      <figcaption class="caption">
        <?php
        
        echo $from_lang([
          "en" => "No events. Placeholder",
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




  <!-- Pay articles -->

  <div class="frontpage_pay_article_wrapper">
    <h1>
			<?php
			
			echo $from_lang([
				"en" => "Featured",
				"se" => "Utvalt"
			]);

      ?>
    </h1>
    <article class="frontpage_article" data-id="29"><div><h2 class="event_name overlay">Grilla on Bergsnäsvägen 7</h2><div class="cover" style="background-image: url(&quot;http://partlight.tech/user_content/hangpy/football.jpg&quot;);"></div></div></article>
    <article class="frontpage_article" data-id="29"><div><h2 class="event_name overlay">Grilla on Bergsnäsvägen 7</h2><div class="cover" style="background-image: url(&quot;http://partlight.tech/user_content/hangpy/football.jpg&quot;);"></div></div></article>
    <article class="frontpage_article" data-id="29"><div><h2 class="event_name overlay">Grilla on Bergsnäsvägen 7</h2><div class="cover" style="background-image: url(&quot;http://partlight.tech/user_content/hangpy/football.jpg&quot;);"></div></div></article>
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