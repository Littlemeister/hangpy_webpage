<?php

/**
*   HANGPY WEB START POINT
*/

//  User functions and data
require 'lib/user.php';

//  Backend communication
require_once 'lib/backend_com.php';



?>

<!DOCTYPE html>

<html>
    
<body>
    
    <?php
    
    require 'scripts.php';
	
	//	Profile section
    include 'profile.php';
    
    ?>
    
    <script src="scripts/events.js"></script>
</body>

</html>