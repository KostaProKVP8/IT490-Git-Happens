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
    
    function checkUser($username, $passwordHash){
            global $db;
            $query = "use authentication; select userid from users where username==$username and password_hash==$passwordHash;"; //ignored for now until rmq connection is set...
            $response = query($query, $db); //guaranteed response bc query function handles errors (maybe bad practice?)

            return $response
            // return generateToken($response["userid"]);
            // return generateToken(37082);

    }

    function addUser($username, $passwordHash, $email){
            global $db;
            $query = "use authentication; INSERT INTO users (username, email, password_hash) VALUES ('$username', '$email', '$passwordHash');"; //ignored for now until rmq connection is set...
            $response = query($query, $db); //guaranteed response bc query function handles errors (maybe bad practice?)

            return generateToken($response["userid"]);
    }
    if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["userName"]) && isset($_POST["hash"]) &&isset($_POST["method"]) && $_POST["method"]=="login"){
        $username = $_POST["userName"]; 
        $passwordHash = $_POST["hash"];
        checkUser($username, $passwordHash);
    }

    if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["userName"]) && isset($_POST["hash"]) &&isset($_POST["email"]) &&isset($_POST["method"]) && $_POST["method"]=="register"){
        $username = $_POST["userName"]; 
        $passwordHash = $_POST["hash"];
        $email = $_POST["email"];
        addUser($username, $passwordHash,$email);
    }
?>