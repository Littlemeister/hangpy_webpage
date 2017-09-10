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

<<<<<<< HEAD
<html lang="sv">

<head>
  <meta charset="utf-8"> <!-- What charset character set to be used -->

  <title>Hangpy</title> <!-- The pages title -->

  <meta name="description" content="Fun events">                  <!-- Specifies a description of the page. Search engines can pick up this description to show with the results of searches. -->
  <meta name="keywords" content="fun,event,events,spontant,hitta på, vad händer,">                    <!-- Specifies a comma-separated list of keywords - relevant to the page (Informs search engines what the page is about). -->
  <meta name="application-name" content="Hangpy">                       <!-- Specifies the name of the Web application that the page represents -->

  <!-- Responsive design thingy -->
  <meta name="viewport" content="width=device-width, initial-scale=1">  <!-- Specifies the scaling of the site when in mobile resulution so text and pictures doesnt get to small -->

  <!-- Link stylecheat -->
  <link rel="stylesheet" href="style.css"> <!-- Link stylecheat -->

  <!-- javascript -->
  <script src="scripts/main.js"></script>
  <script src="scripts/events.js"></script>
  <script>Events.fetch();</script>

  </head>

  <body>
      Events:
      <div id="events">
      </div>

      <?php
        require 'scripts.php';
      ?>
  </body>

</html>
=======
<html>
    
<body>
    
    <?php
    
    require 'scripts.php';
    include 'profile.php';
    
    ?>
    <script src="scripts/events.js"></script>
</body>

</html>
>>>>>>> a160b773ee66be583bb318978f399d862ce402bc
