<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit();
}

$first_name = htmlspecialchars(trim($input['first_name'] ?? ''));
$last_name  = htmlspecialchars(trim($input['last_name'] ?? ''));
$email      = htmlspecialchars(trim($input['email'] ?? ''));
$phone      = htmlspecialchars(trim($input['phone'] ?? ''));
$interest   = htmlspecialchars(trim($input['interest'] ?? ''));
$message    = htmlspecialchars(trim($input['message'] ?? ''));

if (empty($first_name) || empty($last_name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

function sendMail($toEmail, $toName, $subject, $body) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USERNAME;
        $mail->Password   = SMTP_PASSWORD;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;
        $mail->setFrom(SMTP_FROM, SMTP_FROM_NAME);
        $mail->addAddress($toEmail, $toName);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $body;
        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}

// Admin Email
$adminBody = "
<h2 style='color:#FF6B00;'>New Form Submission — Kensington Gym</h2>
<p><b>Name:</b> {$first_name} {$last_name}</p>
<p><b>Email:</b> {$email}</p>
<p><b>Phone:</b> {$phone}</p>
<p><b>Interest:</b> {$interest}</p>
<p><b>Message:</b> {$message}</p>
";

// Client Auto-Reply
$clientBody = "
<h2 style='color:#FF6B00;'>Thank You, {$first_name}!</h2>
<p>We received your message and will get back to you within 24 hours.</p>
<p><b>Your Message:</b> {$message}</p>
<br>
<p>Best Regards,<br>Kensington Gym Team</p>
";

$adminSent  = sendMail(ADMIN_EMAIL, 'Kensington Gym', 'New Form Submission — Kensington Gym', $adminBody);
$clientSent = sendMail($email, $first_name, 'Thank You — Kensington Gym', $clientBody);

if ($adminSent) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send message']);
}
?>