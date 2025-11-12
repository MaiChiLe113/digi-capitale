<?php
require 'config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['residentId'])) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Missing resident ID']);
  exit;
}

$residentId = (int)$data['residentId'];
$defaultImageUrl = null; // Set to null to reset, or use default image URL if preferred

$conn = getDBConnection();
if (!$conn) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Database connection failed']);
  exit;
}

// Get current image path to delete old file
$stmt = $conn->prepare('SELECT Image FROM resident WHERE ResidentID = ?');
$stmt->bind_param('i', $residentId);
$stmt->execute();
$result = $stmt->get_result();
$resident = $result->fetch_assoc();
$stmt->close();

if (!$resident) {
  http_response_code(404);
  echo json_encode(['success' => false, 'message' => 'Resident not found']);
  $conn->close();
  exit;
}

// Delete old image file if it exists and is local
if ($resident['Image'] && strpos($resident['Image'], '/uploads/') !== false) {
  $oldImagePath = __DIR__ . '/..' . parse_url($resident['Image'], PHP_URL_PATH);
  if (file_exists($oldImagePath)) {
    unlink($oldImagePath);
  }
}

// Reset image to NULL in database
$stmt = $conn->prepare('UPDATE resident SET Image = NULL WHERE ResidentID = ?');
$stmt->bind_param('i', $residentId);

if ($stmt->execute()) {
  echo json_encode([
    'success' => true,
    'message' => 'Photo deleted successfully',
    'imageUrl' => null
  ]);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Failed to delete photo']);
}

$stmt->close();
$conn->close();
?>