<header id="header_wrapper">
  <div id="header_user_c">
    <button id="header_login"><div class="profile_picture"></div><span></span></button>
    <div>
      <button class="sign_out">
        <?php

        echo $from_lang([
          "en" => "Sign out",
          "se" => "Logga ut"
        ]);

        ?>
      </button>
    </div>
  </div>
  <a id="home_nav">
    <img src="assets/logo.png" alt="Hangpy logo">
  </a>
</header>
