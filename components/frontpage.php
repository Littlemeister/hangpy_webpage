<section id="frontpage_page" class="page">
  <div class="frontpage_outside_tools">

    <!-- Search articles -->
    <div class="frontpage_tool_search_wrapper">
      <input id="frontpage_tool_search" type="text" value="" placeholder="Search">
      <img id="frontpage_search_icon" src="pic/magnify.png" alt="search_icon">
    </div>

    <!-- Create articles -->
    <input id="create_event_caller" type="button" value="Create">

    <!-- Discover articles -->
    <input id="discover_categories_btn" type="button" value="Discover">

  </div>

  <!-- Main articles -->
  <div class="frontpage_main_articles_wrapper">
    <div class="frontpage_inside_tools">
      <h1 id="events_header">Main events</h1>
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
    
    <button id="fetch_next_page">Load more</button>
    
    <?php
      //  Loading indicator element
    
      $loading_id = 'events_loading';
      require 'loading.php';
    ?>

  </div>




  <!-- Pay articles -->

  <div class="frontpage_pay_article_wrapper">
    <h1>Star events</h1>
    <article class="frontpage_article" data-id="29"><div><h2 class="event_name overlay">Grilla on Bergsnäsvägen 7</h2><div class="cover" style="background-image: url(&quot;http://partlight.tech/user_content/hangpy/football.jpg&quot;);"></div></div></article>
    <article class="frontpage_article" data-id="29"><div><h2 class="event_name overlay">Grilla on Bergsnäsvägen 7</h2><div class="cover" style="background-image: url(&quot;http://partlight.tech/user_content/hangpy/football.jpg&quot;);"></div></div></article>
    <article class="frontpage_article" data-id="29"><div><h2 class="event_name overlay">Grilla on Bergsnäsvägen 7</h2><div class="cover" style="background-image: url(&quot;http://partlight.tech/user_content/hangpy/football.jpg&quot;);"></div></div></article>
  </div>
	
  <?php // Trending categories modal dialog
    require 'components/trending_categories.php';
  ?>

</section>
