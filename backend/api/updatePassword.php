<?php
require 'config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['residentId']) || !isset($data['currentPassword']) || !isset($data['newPassword'])) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Missing required fields']);
  exit;
}

$residentId = (int)$data['residentId'];
$currentPassword = $data['currentPassword'];
$newPassword = $data['newPassword'];

if (strlen($newPassword) < 8) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Password must be at least 8 characters']);
  exit;
}

$conn = getDBConnection();
if (!$conn) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Database connection failed']);
  exit;
}

$stmt = $conn->prepare('SELECT PasswordHash FROM users WHERE ResidentID = ?');
$stmt->bind_param('i', $residentId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  http_response_code(401);
  echo json_encode(['success' => false, 'message' => 'User not found']);
  $stmt->close();
  $conn->close();
  exit;
}

$user = $result->fetch_assoc();
$stmt->close();

if (!password_verify($currentPassword, $user['PasswordHash'])) {
  http_response_code(401);
  echo json_encode(['success' => false, 'message' => 'Current password is incorrect']);
  $conn->close();
  exit;
}

if (password_verify($newPassword, $user['PasswordHash'])) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'New password must be different from current password']);
  $conn->close();
  exit;
}

$newPasswordHash = password_hash($newPassword, PASSWORD_BCRYPT, ['cost' => 12]);

$stmt = $conn->prepare('UPDATE users SET PasswordHash = ? WHERE ResidentID = ?');
$stmt->bind_param('si', $newPasswordHash, $residentId);

if ($stmt->execute()) {
  echo json_encode(['success' => true, 'message' => 'Password updated successfully']);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Failed to update password']);
}

$stmt->close();
$conn->close();
?>