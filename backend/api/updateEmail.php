<?php
require 'config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['residentId']) || !isset($data['email'])) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Missing resident ID or email']);
  exit;
}

$residentId = (int)$data['residentId'];
$newEmail = trim($data['email']);

// Validate email format
if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Invalid email format']);
  exit;
}

$conn = getDBConnection();
if (!$conn) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Database connection failed']);
  exit;
}

// Check if email already exists (excluding current resident)
$stmt = $conn->prepare('SELECT ResidentID FROM resident WHERE Email = ? AND ResidentID != ?');
$stmt->bind_param('si', $newEmail, $residentId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Email already in use']);
  $stmt->close();
  $conn->close();
  exit;
}
$stmt->close();

// Update email in resident table
$stmt = $conn->prepare('UPDATE resident SET Email = ? WHERE ResidentID = ?');
$stmt->bind_param('si', $newEmail, $residentId);

if ($stmt->execute()) {
  // Also update email in users table if exists
  $stmt2 = $conn->prepare('UPDATE users SET Email = ? WHERE ResidentID = ?');
  $stmt2->bind_param('si', $newEmail, $residentId);
  $stmt2->execute();
  $stmt2->close();

  echo json_encode(['success' => true, 'message' => 'Email updated successfully']);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Failed to update email']);
}

$stmt->close();
$conn->close();
?>