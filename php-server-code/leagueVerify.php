<?php
    require_once 'database_functions.php'
    function verifyLeague($token){
            global $db;
            $query=array("sessionId" => $token);
            $response = query($query, $db,"checkLeague"); //guaranteed response bc query function handles errors (maybe bad practice?)

            return json_encode($response);

    }
    if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["inviteID"]) && $_POST["method"]=="checkLeague"){
        $token = $_POST["inviteID"]
        verifyLeague($token);
    }
?>