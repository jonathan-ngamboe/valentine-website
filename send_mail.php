<?php
require 'vendor/autoload.php';

$resend = Resend::client('re_XXXXXXXX'); // Remplace avec ta clé API Resend

try {
    $result = $resend->emails->send([
        'from' => 'batman@willubemyvalentine.love', // Doit être un domaine vérifié sur Resend
        'to' => ['jonathanbg7@gmail.com'],
        'subject' => 'Je t\'aime ❤',
        'html' => '<p>Joyeuse Saint-Valentin mon amour. Je t\'aime tellement. Tu es la plus belle chose qui me soit arrivée ❤</p>'
    ]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}