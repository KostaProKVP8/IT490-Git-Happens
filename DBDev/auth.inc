<?php 
  function generateToken($userid) {
    $token = 0;
    $epoch = time();
    var_dump($token);
    
    $token = 10*$epoch+$userid;

    $token = base64_encode($token);
    var_dump($token);
    return $token;
  }
?>
