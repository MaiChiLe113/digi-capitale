<?php

require 'config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email'], $data['password'])) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Missing email or password']);
  exit;
}

$email = trim($data['email']);
$password = $data['password'];

$conn = getDBConnection();
if (!$conn) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Database connection failed']);
  exit;
}

// Get user by email
$stmt = $conn->prepare('SELECT UserID, PasswordHash, Role, ResidentID FROM users WHERE Email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo json_encode(['success' => false, 'message' => 'Email not found']);
  $stmt->close();
  $conn->close();
  exit;
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($password, $user['PasswordHash'])) {
  echo json_encode(['success' => false, 'message' => 'Invalid password']);
  $stmt->close();
  $conn->close();
  exit;
}

// Login successful
$stmt->close();
$conn->close();

echo json_encode([
  'success' => true,
  'message' => 'Login successful',
  'user' => [
    'UserID' => $user['UserID'],
    'ResidentID' => $user['ResidentID'],
    'Email' => $email,
    'Role' => $user['Role']
  ]
]);
?>