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

// Get admin by email
$stmt = $conn->prepare('SELECT AdminID, EmployeeID, Email, PasswordHash, IsActive FROM admin WHERE Email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo json_encode(['success' => false, 'message' => 'Email not found']);
  $stmt->close();
  $conn->close();
  exit;
}

$admin = $result->fetch_assoc();

// Check if admin is active
if (!$admin['IsActive']) {
  echo json_encode(['success' => false, 'message' => 'Account is deactivated']);
  $stmt->close();
  $conn->close();
  exit;
}

// Verify password
if (!password_verify($password, $admin['PasswordHash'])) {
  echo json_encode(['success' => false, 'message' => 'Invalid password']);
  $stmt->close();
  $conn->close();
  exit;
}

// Login successful - generate auth token
$token = bin2hex(random_bytes(32));

$stmt->close();
$conn->close();

echo json_encode([
  'success' => true,
  'message' => 'Login successful',
  'user' => [
    'AdminID' => $admin['AdminID'],
    'EmployeeID' => $admin['EmployeeID'],
    'Email' => $admin['Email'],
    'Role' => 'admin'
  ],
  'token' => $token
]);
?>
