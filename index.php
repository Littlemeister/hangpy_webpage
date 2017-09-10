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

    <!-- Link stylecheat -->
    <link rel="stylesheet" href="style.css">                    <!-- Global style -->
    <link rel="stylesheet" href="styles/header_style.css">   <!-- Style for header/global menu -->

  </head>

  <body>
      Events:
      <div id="events">
      </div>

      <?php
        require 'scripts.php';

        // header section
        include 'components/header.php';
    	  // Profile section
        include 'components/profile.php';
      ?>

      <script src="scripts/events.js"></script>
      <script>Events.fetch();</script>
  </body>

</html>
