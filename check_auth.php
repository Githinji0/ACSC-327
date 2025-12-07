<?php
require_once 'config.php';

if (!isset($_SESSION['user_id'])) {
    header('Location: login.html');
    exit();
}

if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: login.html');
    exit();
}
?>
