<?php

/**
*   STRINGS
*   
*   This component isn't necessarily visible to the user, but defines language independent
*   strings used in both JS and PHP.
*
*   See http://www.nationsonline.org/oneworld/country_code_list.htm
*/


$lang = isset($_COOKIE['lang']) ? $_COOKIE['lang'] : 'en';

/**
*   Chooses a string from an associative array of ISO ALPHA-2 two-letter country code
*   mapped to the string. English string is returned as default.
*
*   For instance, if the lang is set to "en", then:
*   [ "en" => "Hello!", "se" => "Hej!" ]
*   would return "Hello!";
*/
$from_lang = function($options) {
    global $lang;

    return isset($options[$lang]) ? $options[$lang] : $options['en'];
};

echo <<<EOD


<script>

function Strings(){}
var str = Strings;
str.eventInfo = {
    goBack: "{$from_lang([
        "en" => "Hello",
        "en" => "Hello"
    ])}"
}

</script>

EOD;

?>