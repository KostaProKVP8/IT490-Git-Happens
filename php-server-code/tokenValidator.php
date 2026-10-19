<?php
    require_once 'database_functions.php'
    function validateToken($token){
            global $db;
            // $query = "use authentication; select userid from users where username==$username and password_hash==$passwordHash;"; //ignored for now until rmq connection is set...
            $query=array("sessionId" => $token);
            $response = query($query, $db,"validate_session"); //guaranteed response bc query function handles errors (maybe bad practice?)

            return json_encode($response);
            // return generateToken(37082);

    }
    if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["token"]) && isset($_POST["method"]) && $_POST["method"]=="validate"){
        $token = $_POST["token"]
        validateToken($token);
    }
?>