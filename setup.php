<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$results = [];

// PHP Version Check
$results['php'] = version_compare(PHP_VERSION, '8.0.0', '>=');

// PDO SQLite Check
$results['sqlite'] = extension_loaded('pdo_sqlite');

// PHPMailer Check
$results['phpmailer'] = file_exists(__DIR__ . '/vendor/autoload.php');

// Config Check
$results['config'] = defined('SMTP_PASSWORD');

// Database Check
$results['database'] = file_exists(DB_PATH) || is_writable(dirname(DB_PATH));

// Test Email
$emailSent = false;
$emailError = '';
if (isset($_POST['test_email'])) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;
        $mail->setFrom(SMTP_FROM, SMTP_FROM_NAME);
        $mail->addAddress(ADMIN_EMAIL);
        $mail->Subject = 'Kensington Gym - Test Email';
        $mail->Body = 'Setup successful! Email is working.';
        $mail->send();
        $emailSent = true;
    } catch (Exception $e) {
        $emailError = $mail->ErrorInfo;
    }
}
?>
<!DOCTYPE html>
<html>

<head>
    <title>Kensington Gym Setup</title>
    <style>
        body {
            font-family: Arial;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
        }

        .ok {
            color: green;
        }

        .fail {
            color: red;
        }

        button {
            padding: 10px 20px;
            background: #e63946;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
        }
    </style>
</head>

<body>
    <h2>Kensington Gym — Setup Checker</h2>
    <p class="<?= $results['php'] ? 'ok' : 'fail' ?>">PHP Version: <?= PHP_VERSION ?> <?= $results['php'] ? '✅' : '❌' ?>
    </p>
    <p class="<?= $results['sqlite'] ? 'ok' : 'fail' ?>">PDO SQLite:
        <?= $results['sqlite'] ? '✅ Enabled' : '❌ Not Found' ?></p>
    <p class="<?= $results['phpmailer'] ? 'ok' : 'fail' ?>">PHPMailer:
        <?= $results['phpmailer'] ? '✅ Installed' : '❌ Run composer install' ?></p>
    <p class="<?= $results['config'] ? 'ok' : 'fail' ?>">Config:
        <?= $results['config'] ? '✅ Loaded' : '❌ config.php missing' ?></p>
    <p class="<?= $results['database'] ? 'ok' : 'fail' ?>">Database:
        <?= $results['database'] ? '✅ Ready' : '❌ Not writable' ?></p>

    <?php if ($emailSent): ?>
        <p class="ok">✅ Test email sent! Check your inbox.</p>
    <?php elseif ($emailError): ?>
        <p class="fail">❌ Email Error: <?= $emailError ?></p>
    <?php endif; ?>

    <form method="POST">
        <button type="submit" name="test_email">Send Test Email</button>
    </form>
</body>

</html>