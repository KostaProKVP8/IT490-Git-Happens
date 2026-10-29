require "vendor/autoload.php";
use PHPMailer\PHPMailer\PHPMailer;

function sendEmail($subject, $body) {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = "smtp.gmail.com";
    $mail->SMTPAuth   = true;
    $mail->Username   = "viralsphere9@gmail.com";
    $mail->Password   = "wxbf avvl lfkp rzwb";
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->setFrom("viralsphere9@gmail.com", "Heading here");
    $mail->addAddress(""); //recipient email
    $mail->Subject = $subject;
    $mail->Body    = $body;
    $mail->send();
}
