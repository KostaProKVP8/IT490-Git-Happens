<?php
    require_once 'database_functions.php'
    function verifyLeague($token){
            global $db;
            $query=array("sessionId" => $token);
            $response = query($query, $db,"checkLeague"); //guaranteed response bc query function handles errors (maybe bad practice?)

            echo(json_encode($response));

    }
    function createLeague($token){
        global $db;
        $query = array("leagueID"=>$token);
        $response = query($query, $db, "newLeague");

        echo(json_encode($response));
    }
    if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["inviteID"]) && $_POST["method"]=="checkLeague"){
        $token = $_POST["inviteID"]
        verifyLeague($token);
    }
    if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["leagueID"]) && $_POST["method"]=="newLeague"){
        $token = $_POST["leagueID"]
        createLeague($token);
    }
?>