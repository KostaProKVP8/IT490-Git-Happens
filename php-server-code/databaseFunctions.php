<?php
    // code taken from mysqli example and modified
require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');
 

   function connectDB(){ //replace with rabbitmq connection

		$client = new rabbitMQClient("testRabbitMQ.ini","testServer");
		if (isset($arg[1]))
		{
			 $msg = $argv[1];
		}
		else
		{
			$msg = "failed to connect to RabbitMQ"
		}

    }


    function query($query, $db){
        $request = array();
		$request['type'] = "Login";
		$request['username'] = "webUser";
		$request['password'] = "Web-Bet4-Qp38";
		$request['message'] = $query
		$response = $client->send_request($request);
	
		echo "client received response: ".PHP_EOL;
		print_r($response);
		echo "\n\n';
	
		echo $argv[0]. " END".PHP_EOL;
    }

    $db = connectDB()
?>
