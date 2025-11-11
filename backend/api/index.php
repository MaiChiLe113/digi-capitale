<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

$action = $_GET['action'] ?? '';
// handling data for auth routes
if ($action === 'signup') {
  require 'signup.php';
} else if ($action === 'login') {
  require 'login.php';
} else {
  http_response_code(404);
  echo json_encode(['success' => false, 'message' => 'Endpoint not found']);
}


?>