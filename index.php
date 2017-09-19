<?php

/**
*   HANGPY WEB START POINT
*   Version: 0.01
*   Made by: Andreas Poulsen and Johan Svensson
*   Date 2017-09 to 2017-09
*/

//  User functions and data
require 'lib/user.php';

//  Backend communication
require_once 'lib/backend_com.php';

//  Whether to compile SCSS upon script execution. May cost some performance!
$compile_scss = true;

if ($compile_scss) {
  exec('start compile_scss.bat');
}
?>

<!DOCTYPE html>

<html lang="sv">

  <head>
    <meta charset="utf-8">

    <title>Hangpy</title>

    <meta name="description" content="Fun events">                        <!-- Specifies a description of the page. Search engines can pick up this description to show with the results of searches. -->
    <meta name="keywords" content="fun,event,events,spontant,hitta på, vad händer,">                    <!-- Specifies a comma-separated list of keywords - relevant to the page (Informs search engines what the page is about). -->
    <meta name="application-name" content="Hangpy">                       <!-- Specifies the name of the Web application that the page represents -->

    <!-- Responsive design thingy -->
    <meta name="viewport" content="width=device-width, initial-scale=1">  <!-- Specifies the scaling of the site when in mobile resulution so text and pictures doesnt get to small -->

    <link rel="stylesheet" href="styles.css">

  </head>

  <body>
    <div class="page-wrap"> <!-- used becouse of the sticky footer ie8+ support -->

      <?php // Header section
        require_once 'components/header.php';
      ?>

      <div class="main_content">

        <?php // first_page section
          //require 'components/first_page.php';
        ?>

        <?php // Profile section
          //include 'components/profile.php';
        ?>

        <?php // event_info section with suggestion component
          include 'components/event_suggestions.php';
          include 'components/event_info.php';
        ?>

        <?php // Event filters
          include 'components/event_filters.php';
        ?>

        <?php // Login
          include 'components/login.php';
        ?>

        <?php
          require 'scripts.php';
        ?>
      </div>
    </div>

    <!-- Sticky footer - have to be outside of page-wrap -->
    <?php
      require_once 'components/footer.php';
    ?>

    <!-- Notification -->
    <p id="notification" style="display:none"></p>

  </body>

</html>
