<?php
require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');

function connectDB() {
    // returns the RabbitMQ client instead of a mysqli connection
    return new rabbitMQClient("testRabbitMQ.ini", "testServer");
}

function query($query, $db, $type) {
    // $db is the rabbitMQClient returned by connectDB()

    
    $request = array();
    $request['type']     = $type;
    $request['username'] = "webUser";
    $request['password'] = "Web-Bet4-Qp38";
    switch($type){
        case "getPlayers":
            $request['playerID'] = $query['playerID'];
            break;
            
        case "login":
            $request['user'] = $query['user'];
            $request['passwordHash'] = $query['passwordHash'];
            break;

        case "register":
            $request['user'] = $query['user'];
            $request['email'] = $query['email'];
            $request['passwordHash'] = $query['passwordHash'];
            break;

        case "validate_session":
            $request['sessionId'] = $query['sessionId'];
            break;

    }
    $request['message']  = $query;

    $response = $db->send_request($request);
    
    // $response = ""

    // echo "client received response: " . PHP_EOL;
    // print_r($response);
    // echo "\n\n";

    return $response;
}

$db = connectDB();
// example usage:
// $result = query("test message", $db);
?>