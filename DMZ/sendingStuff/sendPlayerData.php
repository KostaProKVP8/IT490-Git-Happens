<?php
    require_once 'databaseFunctions.php';

    function sendPlayerData($username, $passwordHash){
            global $db;
            $query = array(); //TODO: Encode your data into a PHP array for the createDataForPlayer script.
		
	    $response = query($query, $db, "updateDataForPlayer"); //guaranteed response bc query function handles errors (maybe bad practice?)

            echo(json_encode($response));

    }
?>
