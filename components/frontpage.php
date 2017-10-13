<section id="frontpage_page" class="page">
  <!-- Main articles -->
  <div class="frontpage_main_articles_wrapper">
    <div class="frontpage_inside_tools">
      <h1 id="events_header">
        Main events
      </h1>

      <button id="create_event_btn">  
        <?php
        
        echo $from_lang([
          "en" => "Create",
          "se" => "Skapa"
        ]);

        ?>
      </button>

    </div>
    
    <div style="width:100%;height:48px;margin-top:8px">
      <div id="frontpage_tool_search_c">

        <input id="frontpage_tool_search" type="text" value="" placeholder="<?php
        
        echo $from_lang([
          "en" => "bbq, shopping, video games...",
          "se" => "bada, shoppa, lunch..."
        ]);

        ?>">
        <img id="frontpage_search_icon" src="assets/ic_search.png" alt="<?php
        
        echo $from_lang([
          "en" => "Search",
          "se" => "Sök"
        ]);

        ?>">
      </div>

      <button id="discover_categories_btn" title="<?php
        
        echo $from_lang([
          "en" => "Discover activities",
          "se" => "Upptäck aktiviteter"
        ]);

        ?>">
        <img src="assets/ic_explore.png" alt="<?php
        
        echo $from_lang([
          "en" => "Discover",
          "se" => "Upptäck"
        ]);

        ?>">
      </button>
        
      <div id="event_filters_c">
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
              <img src="assets/ic_location_36dp.png" alt="">
              <figcaption>
                <?php
                
                echo $from_lang([
                  "en" => "Location",
                  "se" => "Plats"
                ]);

                ?>
              </figcaption>
            </figure>
          </li>
          <li id="filter_attendees">
            <figure>
              <img src="assets/ic_people_36dp.png" alt="">
              <figcaption>
                <?php
                
                echo $from_lang([
                  "en" => "Attendees",
                  "se" => "Intresserade"
                ]);

                ?>
              </figcaption>
            </figure>
          </li>
          <li id="filter_start_time">
            <figure>
              <img src="assets/ic_time_36dp.png" alt="">
              <figcaption>
                <?php
                
                echo $from_lang([
                  "en" => "Starts",
                  "se" => "Börjar"
                ]);

                ?>
              </figcaption>
            </figure>
          </li>
        </ul>
      </div>
    </div>
    
    <div id="article_previews">
    </div>

    <div class="no_events center" style="display:none">
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

    <div class="center">
      <button id="fetch_next_page">
        <?php
        
        echo $from_lang([
          "en" => "Load more",
          "se" => "Ladda in fler"
        ]);

        ?>
      </button>
    </div>
    
    <?php
      //  Loading indicator element
    
      $loading_id = 'events_loading';
      $loading_dark = true;
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
    
    <div id="frontpage_no_paid_events" class="no_events center" style="display:none">
      <figure>  
        <img src="assets/no_paid_events.png" alt="Empty catbowl">
        <figcaption class="caption">
          <?php
          
          echo $from_lang([
            "en" => "Make your event seen!<br>Market it today.</a>",
            "se" => "Gör ditt evenemang sett!<br>Marknadsför det nu."
          ]);

          ?>
        </figcaption>
      </figure>
    </div>

  </div>
	

</section>

<div class="modal_bg">

    <div id="trending_cat_dialog" class="dialog dark scroll">
      <div>
        <h2>
          <?php
          
          echo $from_lang([
            "en" => "Trending Activities",
            "se" => "Populära aktiviteter"
          ]);

          ?>
        </h2>
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