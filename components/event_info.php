<div class="event_info_wrapper">
  <p class="event_info_nav_back">< Tillbaka till alla events</p>
  <img class="event_info_header_picture" src="assets/event_info/pic.jpg" alt="Event_info_header_picture">

  <div class="event_info_info">
    <h1>Grilla på Bergsvägen 21</h1>
    <img src="assets/event_info/location.png" alt="Location"><h3>Bergsvägen 21</h3> <br>
    <img src="assets/event_info/time.gif" alt="Time"><h3>15.00-21.00</h3> <br>
    <img src="assets/event_info/person.png" alt="Host"><h3>Hosted by Eric Dahlström</h3> <br>

    <button class="event_info_button_interested" type="button" name="button">25 intresserade</button>
    <button class="event_info_button_join" type="button" name="button">Join</button>

    <div class="event_info_google_map">
      <img src="assets/event_info/map.png" alt=""> <!-- GOOGLE MAP PUT IT HERE -->
    </div>

  </div>

    <hr>

    <div class="event_info_description">
      <p> Vi tänkte dra ihop en liten grillfest, alla tar med det de vill grilla
          och dricka så fixar vi grill! Vi kommer också leka lekar, ha musik osv.
          Vädret ser ut att bli bra men ifall det regnar för mycket kan det bli
          inställt så vi får se. Bussar går hela kvällen om man vill ta det.
          Vem som helst är välkommen! (nästan)
          <br><br>Ålder: 18-30 ungefär
          <br>Alkohol förekommer
      </p>
    </div>

    <hr>

    <button class="event_info_interested_more_button">Se fler</button>
    <div class="event_info_interested_wrapper">
      <div class="event_info_profile">
        <img src="assets/event_info/profile.png" alt="profile_pic">
        <p>Johan Svensson</p>
      </div>
      <div class="event_info_profile">
        <img src="assets/event_info/profile.png" alt="profile_pic">
        <p>Andreas Poulsen</p>
      </div>
      <div class="event_info_profile">
        <img src="assets/event_info/profile.png" alt="profile_pic">
        <p>Frida Johansson</p>
      </div>
      <div class="event_info_profile">
        <img src="assets/event_info/profile.png" alt="profile_pic">
        <p>Bertil Karlsson</p>
      </div>
    </div>

    <hr>

    <div class="event_info_comments">
      <h2>Comments</h2>

      <form method="post"> <!-- User can write a comment  - - - to stop use event.preventDefault(); -->
        <textarea class="event_info_comments_write" value="" placeholder="Write something to the group"></textarea>
        <input class="event_info_comments_submit"  type="submit" name="" value="Submit">
      </form>

      <ul>
        <li class="event_info_one_comment"> <!-- start first comment -->

          <div class="event_info_comments_picture_wrap">
            <img src="assets/event_info/profile.png" alt="profile_pic">
            <div class="event_info_comments_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
              <form class="event_info_reply_wrapper" method="post">
                <textarea name="name" rows="1"></textarea>
                <button type="submit" name="button">reply</button>
              </form>
            </div>

          </div>

          <div class="event_info_sub_comment"> <!-- Subcomment -->
            <img src="assets/event_info/profile.png" alt="profile_pic">
            <div class="event_info_comments_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
              <form class="event_info_reply_wrapper" method="post">
                <textarea name="name" rows="1"></textarea>
                <button type="submit" name="button">reply</button>
              </form>
            </div>
          </div>

        </li> <!-- End first comment -->

        <li class="event_info_one_comment">
          <img src="assets/event_info/profile.png" alt="profile_pic">
          <div class="event_info_comments_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. </div>
        </li>
        <li class="event_info_one_comment">
          <img src="assets/event_info/profile.png" alt="profile_pic">
          <div class="event_info_comments_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. </div></li>
      </ul>

    </div>

  </div>
</div>
