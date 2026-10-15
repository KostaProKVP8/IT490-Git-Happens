#!/usr/bin/php
<?php
require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');
require_once('auth.inc');
require_once('creds.inc');

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

function doLogin($username, $password)
{
    global $db;

    $stmt = $db->prepare("SELECT userid, password_hash, is_active FROM users WHERE username = ?");
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $user = $stmt->get_result()->fetch_assoc();

    if (!$user || !$user['is_active'] || !password_verify($password, $user['password_hash'])) {
        return array("returnCode" => 0, "message" => "Invalid username or password");
    }

    return createSession($user['userid'], "Login successful");
}

function doRegister($username, $email, $clientHash)
{
    global $db;

    // hash again server-side; column must be at least 255 chars (VARCHAR(255))
    $stored = password_hash($clientHash, PASSWORD_DEFAULT);

    try {
        $stmt = $db->prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");
        $stmt->bind_param('sss', $username, $email, $stored);
        $stmt->execute();
    } catch (mysqli_sql_exception $e) {
        if ($e->getCode() == 1062) {   // duplicate username or email
            return array("returnCode" => 0, "message" => "Username or email already taken");
        }
        return array("returnCode" => 0, "message" => "Server error");
    }

    return createSession($db->insert_id, "Registration successful");
}

function createSession($userid, $message)
{
    global $db;

    $sessionKey  = generateToken($userid);
    $sessionHash = hash('sha256', $sessionKey);

    $stmt = $db->prepare(
        "INSERT INTO user_sessions (userid, session_key, expires_at)
         VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))
         ON DUPLICATE KEY UPDATE
            session_key = VALUES(session_key),
            expires_at  = VALUES(expires_at)"
    );
    $stmt->bind_param('is', $userid, $sessionHash);
    $stmt->execute();

    return array("returnCode" => 1, "message" => $message, "sessionId" => $sessionKey);
}

function doValidate($sessionKey)
{
    global $db;

    $sessionHash = hash('sha256', $sessionKey);
    $stmt = $db->prepare("SELECT userid FROM user_sessions WHERE session_key = ? AND expires_at > NOW()");
    $stmt->bind_param('s', $sessionHash);   // was $hash
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();

    if ($row) {
        return array("returnCode" => 1, "message" => "Session valid", "userid" => $row['userid']);
    }
    return array("returnCode" => 0, "message" => "Session invalid or expired");
}

function requestProcessor($request)
{
  echo "received request".PHP_EOL;
  var_dump($request);
  if(!isset($request['type']))
  {
    return "ERROR: unsupported message type";
  }
  switch ($request['type'])
  {
    case "login":
      return doLogin($request['user'],$request['passwordHash']);
    case "register":
      return doRegister($request['user'], $request['email'], $request['passwordHash']);
    case "validate_session":
      return doValidate($request['sessionId']);
  }
  return array("returnCode" => '0', 'message'=>"Server received request and processed");
}

$server = new rabbitMQServer("testRabbitMQ.ini","testServer");
$db = new mysqli($dbAddress,$dbUsername,$dbPassword,"authentication");

if ($db -> connect_errno) {
  echo "Failed to connect to MySQL: " . $db -> connect_error;
  exit();
}

echo "testRabbitMQServer BEGIN".PHP_EOL;
$server->process_requests('requestProcessor');
echo "testRabbitMQServer END".PHP_EOL;
exit();
?>

