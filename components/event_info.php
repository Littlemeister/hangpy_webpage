<section id="event_info_page" class="page">
  <p id="event_info_nav_back">
    <?php

    echo $from_lang([
      "en" => "Return to events",
      "se" => "Tillbaka till evenemangen"
    ]);

    ?>
  </p>
  <header id="event_header">
    <div id="event_gallery_nav">
      <a id="event_gallery_prev">Prev</a>
      
      <div id="quick_container">
      </div>

      <a id="event_gallery_next">Next</a>
    </div>
    
    <div id="event_gallery">
    </div>
    <h1 class="event_info_name event_name overlay">Grilla på Bergsvägen 21</h1>
  </header>

  <div id="event_info_meta">
    <ul>
      <li>
        <img src="assets/ic_location.png" alt="Location">
        <h3>
          <span class="event_category">Nånting</span>
          
          <?php

          echo $from_lang([
            "en" => " on ",
            "se" => " på "
          ]);

          ?>

          <span class="event_location">Bergsvägen 21</span>
        </h3>
      </li>
      <li>
        <img src="assets/ic_time.png" alt="Starts">
        <h3 id="event_start">
          <span id="event_start_date">4 okt</span> <span id="event_start_time">15:00</span> - <span id="event_end_date">4 okt</span> <span id="event_end_time">21:00</span>
        </h3>
      </li>
      <li>
        <img src="assets/ic_person.png" alt="Host">
        <h3>
          
          <?php

          echo $from_lang([
            "en" => "Hosted by ",
            "se" => "Värd: "
          ]);

          ?>

          <span class="event_host">Eric Dahlström</span>
        </h3>
      </li>
    </ul>

    <div id="event_info_actions">
      <button class="event_info_button_attendees" type="button" name="button">
        <span class="event_attendees_count">25</span>
          
        <?php

        echo $from_lang([
          "en" => " attendees",
          "se" => " intresserade"
        ]);

        ?>

      </button>
      
      <button id="event_info_share">
        <?php

        echo $from_lang([
          "en" => "Share",
          "se" => "Dela"
        ]);

        ?>
      </button>

      <div class="group_2">
        <button id="event_info_approve">
            
        <?php

        echo $from_lang([
          "en" => "Join",
          "se" => "Häng med"
        ]);

        ?>
        
        </button>

        <div id="event_share_c" class="gone">
          <div class="notch"></div>
          <h3>
          <?php

          echo $from_lang([
            "en" => "URL to share",
            "se" => "Länk att dela"
          ]);

          ?>
          </h3>
          <input type="text" readonly>
        </div>

        <button id="event_info_delete">
        <?php

        echo $from_lang([
          "en" => "Delete",
          "se" => "Ta bort"
        ]);

        ?>
        </button>
      </div>
    </div>

    <div id="event_info_map_c">
      <div id="event_info_map">
      </div>
      <a id="event_expand_map"></a>
    </div>

  </div>

  <p id="event_description">Vi tänkte dra ihop en liten grillfest, alla tar med det de vill grilla och dricka så fixar vi grill! Vi kommer också leka lekar, ha musik osv. Vädret ser ut att bli bra men ifall det regnar för mycket kan det bli inställt så vi får se. Bussar går hela kvällen om man vill ta det. Vem som helst är välkommen! (nästan)
    <br><br>Ålder: 18-30 ungefär
    <br>Alkohol förekommer
  </p>

  <h3>
    <?php
    echo $from_lang([
      "en" => "Attendees",
      "se" => "Kommer"
    ]);
    ?>
  </h3>

  <button id="event_info_attendees_show_all">
    <?php
    echo $from_lang([
      "en" => "View all",
      "se" => "Visa alla"
    ]);
    ?>
  </button>
  <ul id="event_attendees_preview" class="event_attendees">
    
  </ul>

  <div>
    <h2>
      <?php
      echo $from_lang([
        "en" => "User Posts",
        "se" => "Inlägg"
      ]);
      ?>
    </h2>

    <form id="comment_form" method="post">
      <input type="text" class="input" value="" placeholder="Write something to the group"></textarea>
      <input class="submit" type="submit" name="" value="Submit">
    </form>

    <ul id="event_info_comments">
    </ul>

  </div>

</div>

<div class="modal_bg">
  <div id="confirm_delete_event" class="dialog">
    <h2>
      <?php
      echo $from_lang([
        "en" => "Delete event?",
        "se" => "Ta bort evenemang?"
      ]);
      ?>
    </h2>
    <p>
      
      <?php
      echo $from_lang([
        "en" => "This cannot be undone.",
        "se" => "Det kan inte återställas senare."
      ]);
      ?>

    </p>

    <div class="confirm_c">

      <button class="confirm">
      
        <?php
        echo $from_lang([
          "en" => "Yes, delete it",
          "se" => "Ja, ta bort det"
        ]);
        ?>
        
      </button>

    </div>
  </div>
</div>

<div class="modal_bg">
  <div id="event_attendees_all" class="dialog">
    <input type="text" id="search_attendee" placeholder="<?php
      echo $from_lang([
        "en" => "Search for user",
        "se" => "Sök efter användare"
      ]);
      ?>">

    <ul class="event_attendees">
    </ul>
  </div>
</div>