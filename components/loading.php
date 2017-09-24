<?php

/**
*	LOADING INDICATOR
*
*	Will use the id $loading_id and a light version if $loading_dark.
*/

if (!isset($loading_dark)) {
  $loading_dark = false;
}

?>

<div <?php if ($loading_id) echo "id='$loading_id'"; ?> class="loading hidden <?php echo $loading_dark ? 'dark' : '' ?>">
	<div></div>
	<div></div>
</div>

<?php

//  Reset for further use
$loading_dark = false;

?>