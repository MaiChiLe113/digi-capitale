<?php

require 'config/database.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['employeeId'])) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Missing employee ID']);
  exit;
}

$employeeId = $data['employeeId'];

$conn = getDBConnection();
if (!$conn) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Database connection failed']);
  exit;
}

$stmt = $conn->prepare('SELECT EmployeeID, BuildingID, FirstName, LastName, Phone, Role FROM employee WHERE EmployeeID = ?');
$stmt->bind_param('i', $employeeId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo json_encode(['success' => false, 'message' => 'Employee not found']);
  $stmt->close();
  $conn->close();
  exit;
}

$employee = $result->fetch_assoc();

$stmt->close();
$conn->close();

echo json_encode([
  'success' => true,
  'data' => $employee
]);
?>
