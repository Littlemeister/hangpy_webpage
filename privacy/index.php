<?php

/**
*   PRIVACY POLICY
*/

//  See strings.php
function from_lang($options) {
    global $lang;

    return isset($options[$lang]) ? $options[$lang] : $options['en'];
};

function create_section($sectionIndex, $content) {
    global $section_ids;
    global $sections;

    $id = $section_ids[$sectionIndex];
    $heading = $sections[$id];

    echo "<section id='$id'><h2>$heading</h2>$content</section>";
}

$sections = [
    "stored_info" => from_lang([
        "en" => "Stored Information",
        "se" => "Lagrad information"
    ]),
    "info_presentation" => from_lang([
        "en" => "How User Information is Presented",
        "se" => "Hur användarinformation presenteras"
    ]),
    "sign_in_opt_out" => from_lang([
        "en" => "Signing in and Opting out",
        "se" => "Att skapa ett konto och avregistrera det"
    ])
];

$section_ids = array_keys($sections);

?>
<html>
    <body>
        <main>
            <h1>
            <?php
            
            echo from_lang([
                "en" => "Privacy Policy for Hangpy",
                "se" => "Sekretesspolicy för Hangpy"
            ]);

            ?>
            </h1>

            <h2>
            <?php
            
            echo from_lang([
                "en" => "Clarifications",
                "se" => "Förtydlingar"
            ]);

            ?>
            </h2>
            <ul>
                <li>
                    <?php
                    
                    echo from_lang([
                        "en" => "To use this service, signing up is not mandatory on the desktop platform only.",
                        "se" => "För att använda tjänsten är inloggning ej obligatoriskt på webbplatsen enbart."
                    ]);

                    ?>
                </li>
                <li>
                    <?php
                    
                    echo from_lang([
                        "en" => "A <em>user</em> is an individual who is signed into this service.",
                        "se" => "En <em>användare</em> är en individ som är inloggad på den här tjänsten."
                    ]);

                    ?>
                </li>
            </ul>

            <p>
            <?php
            
            echo from_lang([
                "en" => "You can quickly navigate to any section in this document via the following links.",
                "se" => "Sekretesspolicy för Hangpy"
            ]);

            ?>
            </p>
            <ul>
                <?php foreach ($sections as $id => $heading) {
                    echo "
                    <li><a href='#$id'>$heading</a></li>
                    ";
                } ?>
            </ul>

            <?php

            create_section(
                0,
                from_lang([
                    "en" =>
                    "Significant user data is not stored until the user signs up for this service.
                    To sign up, a phone number is required by the user. This service does not share
                    users' phone numbers or other user data with third parties or associated services.
                    
                    None of the users' search queries, such as for an event or for a place with the integrated
                    map control, are stored for purposes other than what is explicitly mentioned. For instance,
                    search queries will not be stored for advertising purposes.  
                    ",

                    "se" =>
                    "Lagrad information"
                ])
            );
            
            create_section(
                1,
                from_lang([
                    "en" =>
                    "Users have full control of their visibility to other users in this service.
                    The customizable user profile is displayed consistently on devices.
                    As default, the user's phone number is hidden from other users, and this setting
                    can only be changed by the user whilst signed in. 
                    ",

                    "se" =>
                    "Lagrad information"
                ])
            );
            
            create_section(
                2,
                from_lang([
                    "en" =>
                    "Anyone can sign up for this service, provided they provide a phone number
                    previously not inputted by a user upon sign up.<br>
                    Users may at any time close their account. Upon closure, the account is hidden
                    from other users for 7 days before being completely deleted. During this period
                    of invisibility, users may not sign up a new account with the phone number
                    associated with the account awaiting deletion. If an account is signed into
                    whilst in the period of invisibility, the scheduled deletion will be canceled and
                    the account will return to its normal state.
                    ",

                    "se" =>
                    "Alla kan bli medlem hos tjänsten, förutsatt att de förser ett telefonnummer
                    som inte finns registrerat hos en annan användare.<br>
                    Användare kan när som helst avsluta sitt konto. Under nedstängning är kontot
                    gömt från andra användare i 7 dagar innan det fullständigt tas bort. Under den här
                    perioden av osynlighet kan nya konton inte skapas under telefonnummret hos kontot
                    som är osynligt. Ifall ett konto loggas in med medans det inväntar borttagning,
                    avbryts avvaktelsen och kontot återfaller till dess normala tillstånd."
                ])
            );

            ?>
        </main>
    </body>
</html>