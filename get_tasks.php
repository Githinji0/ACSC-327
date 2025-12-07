<?php
require_once 'config.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not authenticated']);
    exit();
}

$user_id = $_SESSION['user_id'];

// Get all tasks for the current user
$stmt = $conn->prepare("SELECT id, task_text, is_completed, created_at FROM tasks WHERE user_id = ? ORDER BY created_at DESC");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$tasks = [];
while ($row = $result->fetch_assoc()) {
    $tasks[] = [
        'id' => $row['id'],
        'task_text' => $row['task_text'],
        'is_completed' => (bool)$row['is_completed'],
        'created_at' => $row['created_at']
    ];
}

echo json_encode(['success' => true, 'tasks' => $tasks]);

$stmt->close();
$conn->close();
?>
