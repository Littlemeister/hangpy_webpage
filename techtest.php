<?php

/**
*   TECH TEST
*/

//  User functions and data
require 'lib/user.php';

//  Backend communication
require_once 'lib/backend_com.php';

?>

<!DOCTYPE html>

<html>
    
<body>
    <h2>1. Sign in</h2>
    <p id="_user"></p>
    <p id="_user-data"></p>
    <div>
        <label for="phone-num">Phone number</label>
        <input id="phone-num" type="text">
    </div>
    
    <button onclick="User.queueVerification($('#phone-num').val())">Queue verification</button>
    
    <!-- Input verification -->
    <div style="margin-top: 24px">
        <label for="input-verif">Verification code</label>
        <input id="input-verif" type="text" maxlength="6">
    </div>
    <button onclick="User.checkVerification($('#input-verif').val())">Check verification</button>
    <p id="_verif-status"></p>
    
    
    <h2 style="margin-top: 96px">1a. Complete profile</h2>
    <!-- Input full name -->
    <div>
        <label for="user-full-name">User full name</label>
        <input id="user-full-name" type="text" maxlength="255">
    </div>
    <button onclick="completeProfile()">Complete profile</button>
    <script>
        function completeProfile(){
            User.updateProfile({
                
                full_name: $('#user-full-name').val()
                
            }, function(response){
                $('#_complete-profile-status').html("Response: " + response);
            });
        }
    </script>
    <p id="_complete-profile-status"></p>
    
    
    
    <h2 style="margin-top: 96px">2. Fetch events</h2>
    <p id="_events"></p>
    <button onclick="Events.fetch()">Fetch events</button>
    
    
    <h2 style="margin-top: 96px">3. React to event</h2>
    <!-- Specific event -->
    <div>
        <label for="event-react-id">Event to react to</label>
        <input id="event-react-id" type="text" maxlength="3" placeholder="Event ID">
    </div>
    <button onclick="Events.approveEvent($('#event-data').val())">Approve event (interesting)</button>
    <button onclick="Events.rejectEvent($('#event-data').val())">Reject event (uninteresting)</button>
    <p id="_event-react-status"></p>
    
    
    <h2 style="margin-top: 96px">4. Fetch specific event data</h2>
    <!-- Specific event -->
    <div>
        <label for="event-data">View event data</label>
        <input id="event-data" type="text" maxlength="3" placeholder="Event ID">
    </div>
    <button onclick="Events.fetchSpecific($('#event-data').val())">Fetch event data</button>
    <button onclick="Events.fetchUserPosts($('#event-data').val())">Fetch event posts</button>
    <button onclick="Events.fetchAttendees($('#event-data').val())">Fetch event attendees</button>
    <p id="_event-data-status"></p>
    <p id="_event-posts-status"></p>
    <p id="_event-attendees-status"></p>
    
    <div>
        <label for="post-message-input">Create post</label>
        <input id="post-message-input" type="text" maxlength="255" placeholder="Message">
    </div>
    <button onclick="Events.createUserPost($('#event-data').val(), $('#post-message-input').val(), 0)">Create post</button>
    <p id="_event-posts-create-status"></p>
    
    <!-- Fetch other user -->
    <h2 style="margin-top: 96px">5. Fetch other user</h2>
    <!-- Specific event -->
    <div>
        <label for="user-id">Fetch user data (other user)</label>
        <input id="user-id" type="text" maxlength="3" placeholder="User ID">
    </div>
    <button onclick="User.fetchDataById($('#user-id').val())">Fetch user data</button>
    <p id="_user-data-id-status"></p>
    
    
    <h2 style="margin-top: 96px">6. Create event</h2>
    <!-- Create event -->
    <div>
        <label for="cr-event-name">Event name</label>
        <input id="cr-event-name" type="text" maxlength="255">
    </div>
    <div>
        <label for="cr-event-category">Event category</label>
        <input id="cr-event-category" type="text" maxlength="255">
    </div>
    <div>
        <label for="cr-event-lat">Event latitude</label>
        <input id="cr-event-lat" type="text" maxlength="255">
    </div>
    <div>
        <label for="cr-event-long">Event longitude</label>
        <input id="cr-event-long" type="text" maxlength="255">
    </div>
    <div>
        <label for="cr-event-starts">Event start (YYYY-MM-DD HH:MM)</label>
        <input id="cr-event-starts" type="text" maxlength="255">
    </div>
    <div>
        <label for="cr-event-ends">Event end (YYYY-MM-DD HH:MM)</label>
        <input id="cr-event-ends" type="text" maxlength="255">
    </div>
    <div>
        <label for="cr-event-description">Event description</label>
        <input id="cr-event-description" type="text" maxlength="255">
    </div>
    <button onclick="submitEvent()">Submit event</button>
    
    <div style="margin-top: 48px">
        <h4>Category suggestion</h4>
        <label for="category-sugg-input">Category</label>
        <input id="category-sugg-input" type="text" maxlength="255">
    </div>
    <button onclick="Categories.fetchSuggested($('#category-sugg-input').val())">Suggest categories</button>
    <p id="_category-sugg-status"></p>
    <div>
        <h4>Default category image</h4>
        <label for="category-img-input">Category</label>
        <input id="category-img-input" type="text" maxlength="255">
    </div>
    <button onclick="Categories.fetchDefaultImage($('#category-img-input').val())">Fetch default image</button>
    <img id="_category-img" style="width:400px;"/>
    <p id="_category-img-status"></p>
    
    <script>
        function submitEvent(){
            Events.createEvent({
                name: $('#cr-event-name').val(),
                category: $('#cr-event-category').val(),
                lat: $('#cr-event-lat').val(),
                long: $('#cr-event-long').val(),
                starts: $('#cr-event-starts').val(),
                ends: $('#cr-event-ends').val(),
                description: $('#cr-event-description').val()
            });
        }
    </script>
    
    <p id="_create-event-status"></p>
    
    
    
    <h2 style="margin-top: 96px">7. User profile</h2>
    <?php
    
    require 'scripts.php';
    include 'profile.php';
    
    ?>
        <button onclick="Profile.save()">Save profile</button>
    <script src="scripts/events.js"></script>
    <script src="scripts/create_event.js"></script>
</body>

</html>