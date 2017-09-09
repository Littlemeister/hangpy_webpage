<?php

/**
*   EVENT
*/

//  User functions and data
require 'lib/user.php';

//  Backend communication
require_once 'lib/backend_com.php';

?>

<!DOCTYPE html>

<html>
    
<body>
    Events:
    <div id="events">
    </div>
    
    <?php
    
    require 'scripts.php';
    
    ?>
    <script src="scripts/events.js"></script>
    
    <script>Events.fetch();</script>
</body>

</html>