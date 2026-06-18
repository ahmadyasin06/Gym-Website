<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendAdminEmail($data) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USERNAME;
        $mail->Password   = SMTP_PASSWORD;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // ← SSL
        $mail->Port       = 465; // ← 465
        $mail->setFrom(SMTP_FROM, SMTP_FROM_NAME);
        $mail->addAddress(ADMIN_EMAIL);
        $mail->Subject = 'New Form Submission — Kensington Gym';
        $mail->Body    = "New submission!\n\nName: {$data['name']}\nEmail: {$data['email']}\nPhone: {$data['phone']}\nService: {$data['service']}\nMessage: {$data['message']}\nTime: " . date('Y-m-d H:i:s');
        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}

function sendClientEmail($data) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USERNAME;
        $mail->Password   = SMTP_PASSWORD;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // ← SSL
        $mail->Port       = 465; // ← 465
        $mail->setFrom(SMTP_FROM, SMTP_FROM_NAME);
        $mail->addAddress($data['email'], $data['name']);
        $mail->Subject = 'Thank You — Kensington Gym';
        $mail->Body    = "Dear {$data['name']},\n\nThank you for contacting Kensington Gym!\nWe will get back to you within 24 hours.\n\nBest Regards,\nKensington Gym Team";
        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}
?>