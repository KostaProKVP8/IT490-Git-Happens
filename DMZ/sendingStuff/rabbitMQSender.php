<?php
require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');

function connectDB() {
    // returns the RabbitMQ client instead of a mysqli connection
    return new rabbitMQClient("DMZRabbitMQ.ini", "dmzPush");
}

function query($query, $db, $type) {
    // $db is the rabbitMQClient returned by connectDB()

    
    $request = array();
    $request['type']     = $type;
    $request['username'] = ""; //ADD CREDS FROM SECURE FILE
    $request['password'] = "";
    switch($type){
        case "createDataForPlayer":
            $request['playerID'] = $query['playerID'];
            $request['firstName'] = $query['firstName'];
            $request['lastName'] = $query['lastName'];
            $request['jerseyNum'] = $query['jerseyNum'];
            $request['headshot'] = $query['headshot'];
            $request['height'] = $query['height'];
            $request['weight'] = $query['weight'];
            $request['teamSlug'] = $query['teamSlug'];
            $request['birthday'] = $query['birthday'];
            $request['ownedBy'] = $query['ownedBy'];
            break;

        case "updateDataForPlayer":
            $request['playerID'] = $query['playerID'];
            $request['firstName'] = $query['firstName'];
            $request['lastName'] = $query['lastName'];
            $request['jerseyNum'] = $query['jerseyNum'];
            $request['headshot'] = $query['headshot'];
            $request['height'] = $query['height'];
            $request['weight'] = $query['weight'];
            $request['teamSlug'] = $query['teamSlug'];
            $request['birthday'] = $query['birthday'];
            $request['ownedBy'] = $query['ownedBy'];
            break;

        case "addGameStats":
            $request['playerID'] = $query['playerID'];
            $request['gameID'] = $query['gameID'];
            $request['teamSlug'] = $query['teamSlug'];
            $request['goals'] = $query['goals'];
            $request['assists'] = $query['assists'];
            $request['goals'] = $query['goals'];
            $request['totalShots'] = $query['totalShots'];
            $request['gameWinner'] = $query['gameWinner'];
            $request['penaltyMins'] = $query['penaltyMins'];
            $request['OTGoals'] = $query['OTGoals'];
            $request['icetime'] = $query['icetime'];
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
