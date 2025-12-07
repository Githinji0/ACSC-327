<?php
require_once 'config.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not authenticated']);
    exit();
}

echo json_encode([
    'success' => true,
    'username' => $_SESSION['username']
]);
?>
