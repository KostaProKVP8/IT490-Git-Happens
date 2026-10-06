<?php
    require_once 'databaseFunctions.php';

    function generateToken($userid){
        // TODO: figure out token.
        $token = 0;
        $epoch = time();
        // echo("$token $epoch $userid");
        $token = 10*$epoch+$userid;
        // echo("\n$token");
        $token = base64_encode($token);
      
        // $token = $token%490003;
        // echo("\n$token");
        return $token;
    }
    
    function checkUser(){
        if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["userName"]) && isset($_POST["hash"])){
            $username = $_POST["userName"]; 
            $passwordHash = $_POST["hash"];
            // $query = "select userid from authentication where username==$username and password_hash==$passwordHash;"; //ignored for now until rmq connection is set...
            // $response = query($query, $db); //guaranteed response bc query function handles errors (maybe bad practice?)

            // return generateToken($response["userid"]);
            return generateToken(37082);

        }
    }
?>