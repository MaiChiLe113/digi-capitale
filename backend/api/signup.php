<?php
require 'config/database.php';

// get data
$data = json_decode(file_get_contents('php://input'), true);

// Validate data from React frontend
if (!isset($data['email'], $data['password'], $data['firstName'], $data['lastName'], $data['residentId'])) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Missing required fields']);
  exit;
}

$email = trim($data['email']);
$password = $data['password'];
$firstName = trim($data['firstName']);
$lastName = trim($data['lastName']);
$residentId = (int)$data['residentId'];
$phone = trim($data['phone'] ?? '');

// Validate password length
if (strlen($password) < 8) {
  echo json_encode(['success' => false, 'message' => 'Password must be at least 8 characters']);
  exit;
}

$conn = getDBConnection();
if (!$conn) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Database connection failed']);
  exit;
}

// Check if email exists
$stmt = $conn->prepare('SELECT UserID FROM users WHERE Email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
if ($stmt->get_result()->num_rows > 0) {
  echo json_encode(['success' => false, 'message' => 'Email already registered']);
  $stmt->close();
  $conn->close();
  exit;
}
$stmt->close();

// Check if ResidentID exists
$stmt = $conn->prepare('SELECT ResidentID FROM resident WHERE ResidentID = ?');
$stmt->bind_param('i', $residentId);
$stmt->execute();
if ($stmt->get_result()->num_rows === 0) {
  echo json_encode(['success' => false, 'message' => 'Resident ID not found']);
  $stmt->close();
  $conn->close();
  exit;
}
$stmt->close();

// Hash password
$passwordHash = password_hash($password, PASSWORD_BCRYPT);

// Insert user
$stmt = $conn->prepare('INSERT INTO users (ResidentID, Email, PasswordHash, Role, IsActive) VALUES (?, ?, ?, "resident", 1)');
$stmt->bind_param('iss', $residentId, $email, $passwordHash);

if ($stmt->execute()) {
  echo json_encode(['success' => true, 'message' => 'Sign up successful']);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Sign up failed: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>