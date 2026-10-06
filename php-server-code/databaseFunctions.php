<?php
    // code taken from mysqli example and modified
    function connectDB(){ //replace with rabbitmq connection
        $mydb = new mysqli('127.0.0.1','testUser','12345','testdb'); // need actual db creds at some point and a .env file to keep it off of github

        if ($mydb->errno != 0)
        {
            echo "failed to connect to database: ". $mydb->error . PHP_EOL;
            exit(0);
        }

        echo "successfully connected to database".PHP_EOL;
        return $mydb;
    }


    function query($query, $db){
        $response = $mydb->query($query);
        if ($mydb->errno != 0)
        {
            echo "failed to execute query:".PHP_EOL;
            echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
            exit(0);
        }
        return $response;
    }

    $db = connectDB()
?>