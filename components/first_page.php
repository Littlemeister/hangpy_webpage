<main>
  <div class="first_page_outside_tools">

    <!-- Search articles -->
    <div class="first_page_tool_search_wrapper">
      <input id="first_page_tool_search" type="text" value="" placeholder="Search">
      <img id="first_page_search_icon" src="pic/magnify.png" alt="search_icon">
    </div>

    <!-- Create articles -->
    <input type="button" value="Create">

    <!-- Discover articles -->
    <input id="discover_categories_btn" type="button" value="Discover">

  </div>

  <!-- Main articles -->
  <div class="first_page_main_articles_wrapper">
    <div class="first_page_inside_tools">
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
    
    <div id="first_page_articles">
      
    </div>
    
    <button id="fetch_next_page">Load more</button>
    
    <?php
      //  Loading indicator element
    
      $loading_id = 'events_loading';
      require 'loading.php';
    ?>

  </div>




  <!-- Pay articles -->

  <div class="first_page_pay_article_wrapper">
    <h1>Star events</h1>
    <input type="button" value="+">

    <article class="first_page_pay_article">
      <h2>title</h2>
      <p>distance</p>
      <p>time</p>
      <p>catagory</p>
      <img src="pic/football.jpg" alt="Hangpy Article">
    </article>

    <article class="first_page_pay_article">
      <h2>title</h2>
      <p>distance</p>
      <p>time</p>
      <p>catagory</p>
      <img src="pic/football.jpg" alt="Hangpy Article">
    </article>

    <article class="first_page_pay_article">
      <h2>title</h2>
      <p>distance</p>
      <p>time</p>
      <p>catagory</p>
      <img src="pic/football.jpg" alt="Hangpy Article">
    </article>
  </div>
	
  <?php // Trending categories modal dialog
    require 'components/trending_categories.php';
  ?>

</main>
