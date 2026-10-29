<?php
    require_once 'databaseFunctions.php';

    function createPlayerData($username, $passwordHash){
            global $db;
            $query = array(); //TODO: Encode your data into a PHP array for the createDataForPlayer script.
            $response = query($query, $db, "createDataForPlayer"); //guaranteed response bc query function handles errors (maybe bad practice?)
            
            echo(json_encode($response));

    }
?>