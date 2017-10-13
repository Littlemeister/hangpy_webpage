<?php

/**
*   STRINGS
*   
*   This component isn't necessarily visible to the user, but defines language independent
*   strings used in both JS and PHP.
*
*   See http://www.nationsonline.org/oneworld/country_code_list.htm
*/

$languages = [
    "en",
    "se"
];

$req_uri = str_replace('/hangpy_web', '', $_SERVER['REQUEST_URI']);
foreach ($languages as $language) {
    if (preg_match("/\/$language\//", $req_uri)){
        //  Lang specified in url
        $lang = $language;
        break;
    }
}

if (!isset($lang)){
    //  Redirect with language specified
    $lang = isset($_COOKIE['ui_lang']) ? $_COOKIE['ui_lang'] : 'en';
    header("Location: http://localhost/hangpy_web/$lang$req_uri");
    die();
}

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
    discover:"{$from_lang([
        "en" => "Explore $",
        "se" => "Utforska $"
    ])}",
    mainEventsHeading: {
        day:"{$from_lang([
            "en" => random(["Get the day rollin'", "Let's jog the mind", "Hangover's gone?", "Make the day yours"]),
            "se" => random(["Explore "])
        ])}",
        night:"{$from_lang([
            "en" => random(["Today's looking bright", "Anything can happen today", "Now's the time to hang out", "How's today's journey?"]),
            "se" => random(["Explore "])
        ])}",
        morning:"{$from_lang([
            "en" => random(["Sun's gone!", "It's time to shine"]),
            "se" => random(["Explore "])
        ])}"
    }
};

str.eventInfo = {
    didApprove:"{$from_lang([
        "en" => "You've joined $",
        "se" => "Du har intresserat dig för $"
    ])}",
    leave:"{$from_lang([
        "en" => "Leave",
        "se" => "Hoppa ur"
    ])}",
    noDescription:"{$from_lang([
        "en" => "Event has no additional info.",
        "se" => "Evenemanget har ingen ytterligare info."
    ])}",
    notFound:"{$from_lang([
        "en" => "The event doesn't exist",
        "se" => "Evenemanget finns inte"
    ])}",
    leave:"{$from_lang([
        "en" => "Leave",
        "se" => "Hoppa ur"
    ])}",
    didDelete:"{$from_lang([
        "en" => "Deleted $",
        "se" => "Tog bort $"
    ])}",
    replyToPost:"{$from_lang([
        "en" => "Reply",
        "se" => "Svara"
    ])}",
    duration: {
        base:"{$from_lang([
            "en" => "$ ago",
            "se" => "$ sedan"
        ])}",
        hour:"{$from_lang([
            "en" => "an hour",
            "se" => "en timme"
        ])}",
        hours:"{$from_lang([
            "en" => "$ hours",
            "se" => "$ timmar"
        ])}",
        minute:"{$from_lang([
            "en" => "a minute",
            "se" => "en minut"
        ])}",
        minutes:"{$from_lang([
            "en" => "$ minutes",
            "se" => "$ minuter"
        ])}",
        day:"{$from_lang([
            "en" => "a day",
            "se" => "en dag"
        ])}",
        days:"{$from_lang([
            "en" => "$ days",
            "se" => "$ dagar"
        ])}"
    },
};

str.createEvent = {
    addPhoto:"{$from_lang([
        "en" => "Add photo",
        "se" => "Lägg till foto"
    ])}",
    
    duration: {
        base:"{$from_lang([
            "en" => "Event will last $",
            "se" => "Evenemanget håller på i $"
        ])}",
        approxHour:"{$from_lang([
            "en" => "around an hour",
            "se" => "ungefär en timme"
        ])}",
        approxHours:"{$from_lang([
            "en" => "around $ hours",
            "se" => "ungefär $ timmar"
        ])}",
        hour:"{$from_lang([
            "en" => "an hour",
            "se" => "en timme"
        ])}",
        hours:"{$from_lang([
            "en" => "$ hours",
            "se" => "$ timmar"
        ])}",
        day:"{$from_lang([
            "en" => "a day",
            "se" => "en dag"
        ])}",
        days:"{$from_lang([
            "en" => "$ days",
            "se" => "$ dagar"
        ])}",
        dayHour:"{$from_lang([
            "en" => "a day and an hour",
            "se" => "en dag och en timme"
        ])}",
        dayHours:"{$from_lang([
            "en" => "a day and $ hours",
            "se" => "en dag och $ timmar"
        ])}",
        daysHours:"{$from_lang([
            "en" => "$ days and $ hours",
            "se" => "$ dagar och $ timmar"
        ])}",
    },
    
    nameSuggestion:"{$from_lang([
        "en" => "$0 on $1",
        "se" => "$0 på $1"
    ])}",
    
    invalidField: {
        location:"{$from_lang([
            "en" => "Where is your event located?",
            "se" => "Var hålls evenemanget?"
        ])}",
        duration:"{$from_lang([
            "en" => "How long is the event?",
            "se" => "Hur länge hålls evenemanget?"
        ])}",
        category:"{$from_lang([
            "en" => "What happens at the event?",
            "se" => "Vad händer på evenemanget?"
        ])}",
        name:"{$from_lang([
            "en" => "Name your event.",
            "se" => "Namnge ditt evenemang."
        ])}",
        photo:"{$from_lang([
            "en" => "Add atleast one photo.",
            "se" => "Lägg till minst ett foto."
        ])}",
        endBeforeStart:"{$from_lang([
            "en" => "Event cannot end before it starts!",
            "se" => "Evenemanget kan inte avslutas innan det börjat!"
        ])}",
        durationTooShort:"{$from_lang([
            "en" => "Event needs to last atleast half an hour.",
            "se" => "Minst en halvtimme behöver gå."
        ])}",
    }
};

str.profile = {
    didSave:"{$from_lang([
        "en" => "Your profile has been updated.",
        "se" => "Din profil har uppdaterats."
    ])}",
    unsavedWarning:"{$from_lang([
        "en" => "You've made unsaved changes, which will be discarded if you leave.",
        "se" => "Osparade ändringar på din profil kommer att förkastas om du lämnar sidan."
    ])}",
    achievements: {
        unlocked:"{$from_lang([
            "en" => "Unlocked",
            "se" => "Upplåst"
        ])}"
    }
};

str.signIn = "{$from_lang([
    "en" => "Sign in",
    "se" => "Logga in"
])}";

str.signInDialog = {
    invalidVerification:"{$from_lang([
        "en" => "Your verification code doesn't match",
        "se" => "Din verifieringskod stämmer inte"
    ])}",
    resentVerification:"{$from_lang([
        "en" => "Verification code was re-sent",
        "se" => "Verifieringskoden skickades igen"
    ])}"
};

str.setupPaid = {
    cardPlaceholder:"{$from_lang([
        "en" => "Card number",
        "se" => "Kortnummer"
    ])}",
};

str.userNavProfile = "{$from_lang([
    "en" => "\$'s",
    "se" => "\$s"
])}";

str.profileHint = "{$from_lang([
    "en" => "View your profile",
    "se" => "Visa din profil"
])}";

str.didUpload = "{$from_lang([
    "en" => "Upload successful",
    "se" => "Logga in"
])}";

str.genericError = "{$from_lang([
    "en" => "Something went wrong",
    "se" => "Något gick fel"
])}";

str.months = {$from_lang([
    "en" => "[ 'January', 'February', 'Mars', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]",
    "se" => "[ 'januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december' ]"
])};

str.quantitySuffix = {
    _1:"{$from_lang([
        "en" => "st",
        "se" => "sta"
    ])}",
    _2:"{$from_lang([
        "en" => "nd",
        "se" => "dra"
    ])}",
    _3:"{$from_lang([
        "en" => "rd",
        "se" => "dje"
    ])}",
    other:"{$from_lang([
        "en" => "th",
        "se" => "de"
    ])}",
};

str.eventPreviewStart = {
    startsIn:"{$from_lang([
        "en" => "In $",
        "se" => "Om $"
    ])}",
    minutes:"{$from_lang([
        "en" => "$ minutes",
        "se" => "$ minuter"
    ])}",
    hour:"{$from_lang([
        "en" => "an hour",
        "se" => "en timme"
    ])}",
    hours:"{$from_lang([
        "en" => "$ hours",
        "se" => "$ timmar"
    ])}",
    day:"{$from_lang([
        "en" => "a day",
        "se" => "en dag"
    ])}",
    days:"{$from_lang([
        "en" => "$ days",
        "se" => "$ dagar"
    ])}",
}

</script>

EOD;

?>