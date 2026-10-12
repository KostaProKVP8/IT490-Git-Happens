<?php 
  function generateToken($userid) {
    $token = 0;
    $epoch = time();
    
    $token = 10*$epoch+$userid;

    $token = base64_encode($token);
    return $token;
  }
?>
