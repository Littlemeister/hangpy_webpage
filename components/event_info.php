<div class="event_info_wrapper">
  <p class="event_info_nav_back">
    <?php

    echo $from_lang([
      "en" => "Return to events",
      "se" => "Tillbaka till evenemangen"
    ]);

    ?>
  </p>
  <div id="event_gallery"></div>

  <div class="event_info_info">
    <h1 class="event_name">Grilla på Bergsvägen 21</h1>
    
    <ul>
      <li>
        <img src="assets/event_info/location.png" alt="Location">
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
        <img src="assets/event_info/time.gif" alt="Time">
        <h3 id="event_start">15.00-21.00</h3>
      </li>
      <li>
        <img src="assets/event_info/person.png" alt="Host">
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

    <button class="event_info_button_attendees" type="button" name="button">
      <span class="event_attendees_count">25</span>
         
      <?php

      echo $from_lang([
        "en" => " attendees",
        "se" => " intresserade"
      ]);

      ?>

    </button>
    <button id="event_info_approve">
        
    <?php

    echo $from_lang([
      "en" => "Join",
      "se" => "Häng med"
    ]);

    ?>
    
    </button>

    <div id="event_info_map">
    </div>

  </div>

  <hr>

  <div id="event_description">
    <p> Vi tänkte dra ihop en liten grillfest, alla tar med det de vill grilla och dricka så fixar vi grill! Vi kommer också leka lekar, ha musik osv. Vädret ser ut att bli bra men ifall det regnar för mycket kan det bli inställt så vi får se. Bussar går hela kvällen om man vill ta det. Vem som helst är välkommen! (nästan)
      <br><br>Ålder: 18-30 ungefär
      <br>Alkohol förekommer
    </p>
  </div>

  <hr>

  <button class="event_info_interested_more_button">Se fler</button>
  <ul id="event_info_attendees">
    
  </ul>

  <hr>

  <div class="event_info_comments">
    <h2>
      <?php
      echo $from_lang([
        "en" => "User Posts",
        "se" => "Inlägg"
      ]);
      ?>
    </h2>

    <form method="post">
      <!-- User can write a comment  - - - to stop use event.preventDefault(); -->
      <input type="text" id="event_info_comments_write" value="" placeholder="Write something to the group"></textarea>
      <input id="event_info_comments_submit" type="submit" name="" value="Submit">
    </form>

    <ul id="event_info_comments">
    </ul>

  </div>

</div>