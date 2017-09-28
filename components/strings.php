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
    didApprove: "{$from_lang([
        "en" => "You've joined $",
        "sv" => "Du har intresserat dig för $"
    ])}"
};

str.createEvent = {
    addPhoto: "{$from_lang([
        "en" => "Add photo",
        "sv" => "Lägg till foto"
    ])}",
    
    nameSuggestion: "{$from_lang([
        "en" => "$0 on $1",
        "sv" => "$0 på $1"
    ])}",
    
    invalidField: {
        location: "{$from_lang([
            "en" => "Where is your event located?",
            "sv" => "Var hålls evenemanget?"
        ])}",
        duration: "{$from_lang([
            "en" => "How long is the event?",
            "sv" => "Hur länge hålls evenemanget?"
        ])}",
        name: "{$from_lang([
            "en" => "Name your event!",
            "sv" => "Namnge ditt evenemang!"
        ])}",
        photo: "{$from_lang([
            "en" => "Add atleast one photo.",
            "sv" => "Lägg till minst ett foto."
        ])}",
        endBeforeStart: "{$from_lang([
            "en" => "Event cannot end before it starts!",
            "sv" => "Evenemanget kan inte avslutas innan det börjat!"
        ])}",
    }
};

str.userNavProfile = "{$from_lang([
    "en" => "\$'s profile",
    "sv" => "\$s profil"
])}";

str.genericError = "{$from_lang([
    "en" => "Something went wrong",
    "sv" => "Något gick fel"
])}";

str.months = {$from_lang([
    "en" => "[ 'January', 'February', 'Mars', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]",
    "sv" => "[ 'januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december' ]"
])};

</script>

EOD;

?>