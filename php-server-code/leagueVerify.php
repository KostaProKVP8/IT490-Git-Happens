<?php
    require_once 'databaseFunctions.php';
    function verifyLeague($token){
            global $db;
            $query=array("leagueId" => $token);
            $response = query($query, $db,"verifyLeague"); //guaranteed response bc query function handles errors (maybe bad practice?)

            echo(json_encode($response));

    }
    function createLeague($token, $leagueName){
        global $db;
        $query = array("userID"=>$token, "leagueName"=>$leagueName);
        $response = query($query, $db, "newLeague");

        echo(json_encode($response));
    }
    function joinLeague($token, $leagueName){
        global $db;
        $query = array("userID"=>$token, "leagueName"=>$leagueName);
        $response = query($query, $db, "joinLeague");

        echo(json_encode($response));
    }
    if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["userID"]) && isset($_POST("leagueName")) && isset($_POST["inviteID"]) && $_POST["method"]=="checkLeague"){
        $leagueName = $_POST['leagueName'];
        $token = $_POST["inviteID"];
        joinLeague($token);
    }
    if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["userID"]) && isset($_POST("leagueName")) && isset($_POST["leagueID"]) && $_POST["method"]=="checkLeague"){
        $leagueName = $_POST['leagueName'];
        $token = $_POST["inviteID"];
        verifyLeague($token);
    }
    if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST("leagueName")) && isset($_POST["userID"]) && $_POST["method"]=="newLeague"){
        $token = $_POST["userID"];
        createLeague($token);
    }
?>