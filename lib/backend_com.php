<?php

/**
*   BACKEND COMMUNICATION
*/

require_once 'constants.php';

/**
*   Performs a backend request. If $use_user_credentials, then
*   user credentials are automatically added.
*   Uses the $get_params array for GET parameters and optionally
*   $post_params for POST parameters. Leave the $post_params NULL
*   for only GET.
*/
function backend($get_params, $post_params, $use_user_credentials = true){
    if ($use_user_credentials) {
        $get_params['user'] = User::$phone_number;
        $get_params['token'] = User::$auth_token;
    }
    
    if (PRODUCTION) {
        global $post;
        $post = $post_params;
        
        global $get;
        $get = $get_params;
        
        //  No network request needed
        require BACKEND_DIR . 'backend.php';
        
        global $backend_output;
        return $backend_output;
    } else {
        //  Glue array to urlencoded string
        function glue($array){
            $str = '';
            
            foreach ($array as $key => $val) {
                $str .= $key . '=' . urlencode($val);
                $str .= '&';
            }

            //  Trim delimiter
            $str = substr($str, 0, strlen($str) - 1);
            
            return $str;
        }
        
        $ch = curl_init(BACKEND_URL . glue($get_params));
        
        if ($post_params) {
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, glue($post_params));
        }
        
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        
        return $response;
    }
}

/**
*   Returns whether a request was successful (authorized etc.).
*/
function request_successful($request_response){
    return $request_response != UNAUTHORIZED &&
        $request_response != FAILED;
}

?>