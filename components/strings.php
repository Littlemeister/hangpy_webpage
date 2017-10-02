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

/* Chooses a random element from an array */
function random($array){
    return $array[rand(0, count($array) - 1)];
}

echo <<<EOD


<script>

function Strings(){}
var str = Strings;

str.frontpage = {
    explorePrefix: "{$from_lang([
        "en" => "Explore ",
        "sv" => "Utforska "
    ])}",
    mainEventsHeading: {
        day: "{$from_lang([
            "en" => random(["Get the day rollin'", "Let's jog the mind", "Hangover's gone?", "Make the day yours"]),
            "sv" => random(["Explore "])
        ])}",
        night: "{$from_lang([
            "en" => random(["Today's looking bright", "Anything can happen today", "Now's the time to hang out", "How's today's journey?"]),
            "sv" => random(["Explore "])
        ])}",
        morning: "{$from_lang([
            "en" => random(["Sun's gone!", "It's time to shine"]),
            "sv" => random(["Explore "])
        ])}"
    }
};

str.eventInfo = {
    didApprove: "{$from_lang([
        "en" => "You've joined $",
        "sv" => "Du har intresserat dig för $"
    ])}",
    noDescription: "{$from_lang([
        "en" => "Event has no additional info.",
        "sv" => "Evenemanget har ingen ytterligare info."
    ])}",
    notFound: "{$from_lang([
        "en" => "The event doesn't exist",
        "sv" => "Evenemanget finns inte"
    ])}",
    leave: "{$from_lang([
        "en" => "Leave",
        "sv" => "Hoppa ur"
    ])}",
    didDelete: "{$from_lang([
        "en" => "Deleted $",
        "sv" => "Tog bort $"
    ])}",
};

str.createEvent = {
    addPhoto: "{$from_lang([
        "en" => "Add photo",
        "sv" => "Lägg till foto"
    ])}",
    
    duration: {
        base: "{$from_lang([
            "en" => "Event will last $",
            "sv" => "Evenemanget håller på i $"
        ])}",
        approxHour: "{$from_lang([
            "en" => "around an hour",
            "sv" => "ungefär en timme"
        ])}",
        approxHours: "{$from_lang([
            "en" => "around $ hours",
            "sv" => "ungefär $ timmar"
        ])}",
        hour: "{$from_lang([
            "en" => "an hour",
            "sv" => "en timme"
        ])}",
        hours: "{$from_lang([
            "en" => "$ hours",
            "sv" => "$ timmar"
        ])}",
        day: "{$from_lang([
            "en" => "a day",
            "sv" => "en dag"
        ])}",
        days: "{$from_lang([
            "en" => "$ days",
            "sv" => "$ dagar"
        ])}",
        dayHour: "{$from_lang([
            "en" => "a day and an hour",
            "sv" => "en dag och en timme"
        ])}",
        dayHours: "{$from_lang([
            "en" => "a day and $ hours",
            "sv" => "en dag och $ timmar"
        ])}",
        daysHours: "{$from_lang([
            "en" => "$ days and $ hours",
            "sv" => "$ dagar och $ timmar"
        ])}",
    },
    
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
        category: "{$from_lang([
            "en" => "What happens at the event?",
            "sv" => "Vad händer på evenemanget?"
        ])}",
        name: "{$from_lang([
            "en" => "Name your event.",
            "sv" => "Namnge ditt evenemang."
        ])}",
        photo: "{$from_lang([
            "en" => "Add atleast one photo.",
            "sv" => "Lägg till minst ett foto."
        ])}",
        endBeforeStart: "{$from_lang([
            "en" => "Event cannot end before it starts!",
            "sv" => "Evenemanget kan inte avslutas innan det börjat!"
        ])}",
        durationTooShort: "{$from_lang([
            "en" => "Event needs to last atleast half an hour.",
            "sv" => "Minst en halvtimme behöver gå."
        ])}",
    }
};

str.profile = {
    didSave: "{$from_lang([
        "en" => "Your profile has been updated.",
        "sv" => "Din profil har uppdaterats."
    ])}",
    unsavedWarning: "{$from_lang([
        "en" => "You've made unsaved changes, which will be discarded if you leave.",
        "sv" => "Osparade ändringar på din profil kommer att förkastas om du lämnar sidan."
    ])}",
};

str.signIn = "{$from_lang([
    "en" => "Sign in",
    "sv" => "Logga in"
])}";

str.userNavProfile = "{$from_lang([
    "en" => "\$'s profile",
    "sv" => "\$s profil"
])}";

str.didUpload = "{$from_lang([
    "en" => "Upload successful",
    "sv" => "Logga in"
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