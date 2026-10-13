<?php
    require_once 'database_functions.php'
    function validateToken($token){
            global $db;
            // $query = "use authentication; select userid from users where username==$username and password_hash==$passwordHash;"; //ignored for now until rmq connection is set...
            $query = "flag=validateToken session_key=$token"
            $response = query($query, $db); //guaranteed response bc query function handles errors (maybe bad practice?)

            return $response;
            // return generateToken(37082);

    }
    if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["token"]) && isset($_POST["method"]) && $_POST["method"]=="login"){
        $token = $_POST["token"]
        validateToken($token);
    }
?>