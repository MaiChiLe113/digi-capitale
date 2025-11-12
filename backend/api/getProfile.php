<?php
require 'config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['residentId'])) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Missing resident ID']);
  exit;
}

$residentId = (int)$data['residentId'];

$conn = getDBConnection();
if (!$conn) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Database connection failed']);
  exit;
}
$stmt = $conn->prepare('
  SELECT 
    r.ResidentID, 
    r.FirstName, 
    r.LastName, 
    r.Email, 
    r.Phone, 
    r.Image,
    u.Role
  FROM resident r
  LEFT JOIN users u ON r.ResidentID = u.ResidentID
  WHERE r.ResidentID = ?
');

$stmt->bind_param('i', $residentId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo json_encode(['success' => false, 'message' => 'Profile not found']);
  $stmt->close();
  $conn->close();
  exit;
}

$profile = $result->fetch_assoc();

$stmt->close();
$conn->close();

echo json_encode([
  'success' => true,
  'profile' => [
    'ResidentID' => $profile['ResidentID'],
    'FirstName' => $profile['FirstName'],
    'LastName' => $profile['LastName'],
    'Email' => $profile['Email'],
    'Phone' => $profile['Phone'],
    'Image' => $profile['Image'],
    'Role' => $profile['Role']
  ]
]);
?>