<?php
    require_once 'databaseFunctions.php';

    function checkUser($username, $passwordHash){
            global $db;
            // $query = "use authentication; select userid from users where username==$username and password_hash==$passwordHash;"; //ignored for now until rmq connection is set...
            $query = array("user" => $username,"passwordHash" => $passwordHash);
            $response = query($query, $db, "login"); //guaranteed response bc query function handles errors (maybe bad practice?)

            return json_encode($response);
            // return generateToken($response["userid"]);
            // return generateToken(37082);

    }

    function addUser($username, $passwordHash, $email){
            global $db;
            // $query = "use authentication; INSERT INTO users (username, email, password_hash) VALUES ('$username', '$email', '$passwordHash');"; //ignored for now until rmq connection is set...
            $query = array("user" => $username,"email" => $email,"passwordHash" => $passwordHash);
            $response = query($query, $db, "register"); //guaranteed response bc query function handles errors (maybe bad practice?)

            return  json_encode($response);
    }
    if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["userName"]) && isset($_POST["hash"]) &&isset($_POST["method"]) && $_POST["method"]=="login"){
        $username = $_POST["userName"]; 
        $passwordHash = $_POST["hash"];
        echo(checkUser($username, $passwordHash));
    }

    if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["userName"]) && isset($_POST["hash"]) &&isset($_POST["email"]) &&isset($_POST["method"]) && $_POST["method"]=="register"){
        $username = $_POST["userName"]; 
        $passwordHash = $_POST["hash"];
        $email = $_POST["email"];
        echo(addUser($username, $passwordHash,$email));
    }
?>