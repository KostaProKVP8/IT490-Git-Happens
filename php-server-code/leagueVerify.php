<?php
    require_once 'database_functions.php';
    function verifyLeague($token){
            global $db;
            $query=array("sessionId" => $token);
            $response = query($query, $db,"checkLeague"); //guaranteed response bc query function handles errors (maybe bad practice?)

            echo(json_encode($response));

    }
    function createLeague($token){
        global $db;
        $query = array("userID"=>$token);
        $response = query($query, $db, "newLeague");

        echo(json_encode($response));
    }
    if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["userID"]) && isset($_POST["inviteID"]) && $_POST["method"]=="checkLeague"){
        $token = $_POST["inviteID"]
        verifyLeague($token);
    }
    if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["userID"]) && $_POST["method"]=="newLeague"){
        $token = $_POST["userID"]
        createLeague($token);
    }
?>