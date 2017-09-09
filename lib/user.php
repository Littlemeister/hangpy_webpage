<?php

require_once 'constants.php';

class User {
    static $phone_number;
    static $auth_token;
    /**
    *   Whether successfully signed in.
    */
    static $authorized;
    
    /**
    *   Checks cookies if unauthorized, if so parses cookies and attempts login.
    */
    static function checkCookies() {
        if (!User::$authorized && isset($_COOKIE['user']) &&
            isset($_COOKIE['auth_token'])) {
            //  Attempt login
            User::$phone_number = $_COOKIE['user'];
            User::$auth_token = $_COOKIE['auth_token'];
            
            $sign_in_result = backend([], NULL);
            
            if (request_successful($sign_in_result)) {
                User::$authorized = true;
            } else {
                User::$phone_number = NULL;
                User::$auth_token = NULL;
            }
        }
    }
}

?>