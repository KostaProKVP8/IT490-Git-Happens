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
        case "login":
            $request['user'] = $query[0];
            $request['passwordHash'] = $query[1];

        case "register":
            $request['user'] = $query[0];
            $request['email'] = $query[1];
            $request['passwordHash'] = $query[2];

        case "validate_session":
            $request['sessionId'] = $query[0];

    }
    // $request['message']  = $query;

    $response = $db->send_request($request);

    echo "client received response: " . PHP_EOL;
    print_r($response);
    echo "\n\n";

    return $response;
}

$db = connectDB();
// example usage:
// $result = query("test message", $db);
?>