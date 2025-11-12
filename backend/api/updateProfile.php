<?php
require 'config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['residentId'])) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Missing resident ID']);
  exit;
}

$residentId = (int)$data['residentId'];
$firstName = trim($data['FirstName'] ?? '');
$lastName = trim($data['LastName'] ?? '');
$phone = trim($data['Phone'] ?? '');

// Validate input
if (empty($firstName) || empty($lastName)) {
  echo json_encode(['success' => false, 'message' => 'First name and last name are required']);
  exit;
}

$conn = getDBConnection();
if (!$conn) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Database connection failed']);
  exit;
}

// Update resident information
$stmt = $conn->prepare('
  UPDATE resident 
  SET FirstName = ?, LastName = ?, Phone = ?
  WHERE ResidentID = ?
');

$stmt->bind_param('sssi', $firstName, $lastName, $phone, $residentId);

if ($stmt->execute()) {
  echo json_encode([
    'success' => true,
    'message' => 'Profile updated successfully',
    'profile' => [
      'ResidentID' => $residentId,
      'FirstName' => $firstName,
      'LastName' => $lastName,
      'Phone' => $phone
    ]
  ]);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Failed to update profile']);
}

$stmt->close();
$conn->close();
?>