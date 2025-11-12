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

// Get apartment information from lease table (includes RoomType)
$leaseQuery = "SELECT l.LeaseID, l.RoomNum, l.BuildingID, l.RoomType, b.BuildingName 
              FROM lease l
              LEFT JOIN building b ON l.BuildingID = b.BuildingID
              WHERE l.ResidentID = " . intval($residentId) . " AND l.Status = 'active'
              LIMIT 1";

$leaseResult = $conn->query($leaseQuery);

if (!$leaseResult) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Query failed: ' . $conn->error]);
  $conn->close();
  exit;
}

if ($leaseResult->num_rows === 0) {
  echo json_encode(['success' => false, 'message' => 'No active lease found']);
  $conn->close();
  exit;
}

$lease = $leaseResult->fetch_assoc();

// Extract floor from RoomNum
$roomNum = $lease['RoomNum'];
$floorNum = (int)substr($roomNum, 0, -2); 
if ($floorNum === 0) {
  $floorNum = (int)substr($roomNum, 0, 1);
}

// Get vehicles linked to resident via card
$vehicleQuery = "SELECT v.VehicleID, v.LicensePlate, v.Type
                FROM vehicle v
                LEFT JOIN card c ON v.CardID = c.CardID
                WHERE c.ResidentID = " . intval($residentId);

$vehicleResult = $conn->query($vehicleQuery);

$vehicles = [];
if ($vehicleResult) {
  while ($row = $vehicleResult->fetch_assoc()) {
    $vehicles[] = $row;
  }
}

// Get all family members
$familyQuery = "SELECT DISTINCT r.ResidentID, CONCAT(r.FirstName, ' ', r.LastName) as Name, r.ResidentID as ID
               FROM resident r
               INNER JOIN lease l ON r.ResidentID = l.ResidentID
               WHERE l.BuildingID = " . intval($lease['BuildingID']) . " 
               AND l.RoomNum = '" . $conn->real_escape_string($lease['RoomNum']) . "'
               AND l.Status = 'active'
               ORDER BY r.ResidentID";

$familyResult = $conn->query($familyQuery);

$familyMembers = [];
if ($familyResult) {
  while ($row = $familyResult->fetch_assoc()) {
    $familyMembers[] = [
      'Name' => $row['Name'],
      'ID' => $row['ID'],
      'Relationship' => (int)$row['ResidentID'] == $residentId ? 'Primary' : 'Family'
    ];
  }
}

$conn->close();

echo json_encode([
  'success' => true,
  'data' => [
    'apartment' => [
      'Building' => $lease['BuildingName'] ?? 'N/A',
      'Floor' => (int)$floorNum,
      'RoomNum' => $lease['RoomNum'] ?? 'N/A',
      'RoomType' => $lease['RoomType'] ?? '2BR'
    ],
    'vehicles' => $vehicles,
    'familyMembers' => $familyMembers
  ]
]);
?>