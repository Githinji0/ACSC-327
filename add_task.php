<?php
require_once 'config.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not authenticated']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $task_text = trim($_POST['task_text']);
    $user_id = $_SESSION['user_id'];
    
    // Validate input
    if (empty($task_text)) {
        echo json_encode(['success' => false, 'message' => 'Task text is required']);
        exit();
    }
    
    // Insert new task
    $stmt = $conn->prepare("INSERT INTO tasks (user_id, task_text) VALUES (?, ?)");
    $stmt->bind_param("is", $user_id, $task_text);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'task_id' => $conn->insert_id]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add task']);
    }
    
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>
