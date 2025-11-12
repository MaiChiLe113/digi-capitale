<?php
require 'config/database.php';

// Check if residentId and photo file are provided
if (!isset($_POST['residentId']) || !isset($_FILES['photo'])) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Missing resident ID or photo file']);
  exit;
}

$residentId = (int)$_POST['residentId'];
$photoFile = $_FILES['photo'];

// Validate file
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
$maxSize = 5 * 1024 * 1024; // 5MB

if (!in_array($photoFile['type'], $allowedTypes)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Invalid file type. Allowed: JPG, PNG, GIF, WebP']);
  exit;
}

if ($photoFile['size'] > $maxSize) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'File size exceeds 5MB limit']);
  exit;
}

if ($photoFile['error'] !== UPLOAD_ERR_OK) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'File upload error']);
  exit;
}

// Create upload directory if it doesn't exist
$uploadDir = __DIR__ . '/../uploads/profiles/';
if (!is_dir($uploadDir)) {
  if (!mkdir($uploadDir, 0755, true)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to create upload directory']);
    exit;
  }
}

// Generate unique filename
$fileExtension = pathinfo($photoFile['name'], PATHINFO_EXTENSION);
$fileName = 'resident_' . $residentId . '_' . time() . '.' . $fileExtension;
$filePath = $uploadDir . $fileName;
$fileUrl = '/digi-capitale/backend/uploads/profiles/' . $fileName;

// Move uploaded file
if (!move_uploaded_file($photoFile['tmp_name'], $filePath)) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Failed to save file']);
  exit;
}

// Update database
$conn = getDBConnection();
if (!$conn) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Database connection failed']);
  unlink($filePath); // Delete uploaded file if DB connection fails
  exit;
}

// Get old image path to delete old file
$stmt = $conn->prepare('SELECT Image FROM resident WHERE ResidentID = ?');
$stmt->bind_param('i', $residentId);
$stmt->execute();
$result = $stmt->get_result();
$oldData = $result->fetch_assoc();
$stmt->close();

// Update resident table with new image path
$stmt = $conn->prepare('UPDATE resident SET Image = ? WHERE ResidentID = ?');
$stmt->bind_param('si', $fileUrl, $residentId);

if ($stmt->execute()) {
  // Delete old image file if it exists and is local
  if ($oldData && $oldData['Image']) {
    $oldImagePath = __DIR__ . '/..' . parse_url($oldData['Image'], PHP_URL_PATH);
    if (file_exists($oldImagePath) && strpos($oldData['Image'], '/uploads/') !== false) {
      unlink($oldImagePath);
    }
  }

  echo json_encode([
    'success' => true,
    'message' => 'Photo updated successfully',
    'imageUrl' => $fileUrl
  ]);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Failed to update photo in database']);
  unlink($filePath); 
}

$stmt->close();
$conn->close();
?>