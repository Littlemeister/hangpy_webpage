<?php

/**
*   Common scripts.
*/

//  Stripe is included for fraud detection
$google_map_api_key = 'AIzaSyDUu1X38QVzgDxgNdo0jzsQhFdKoVz4hQY';

?>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="scripts/global.js"></script>
<script src="scripts/constants.js"></script>
<script src="scripts/backend.js"></script>
<script src="scripts/user.js"></script>
<script src="scripts/profile.js"></script>
<script src="scripts/gui.js"></script>
<script src="scripts/categories.js"></script>
<script src="scripts/event_info.js"></script>
<script src="scripts/modal_dialog.js"></script>
<script src="scripts/events.js"></script>
<script src="scripts/create_event.js"></script>
<script src="scripts/event_filters.js"></script>
<script src="scripts/frontpage.js"></script>
<script src="scripts/login.js"></script>
<script src="scripts/notification.js"></script>
<script src="scripts/paid_event_setup.js"></script>
<script src="https://js.stripe.com/v3/"></script>
<script async 
		src="https://maps.googleapis.com/maps/api/js?key=<?php echo $google_map_api_key ?>&callback=Global.initAllMaps">
</script>

<script>
	$('.page:not(#<?php echo $start_page ?>)').addClass('hidden');
	$('#<?php echo $start_page ?>').attr('data-current', '1');
</script>