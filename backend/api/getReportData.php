<?php

require 'config/database.php';

$conn = getDBConnection();
if (!$conn) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Database connection failed']);
  exit;
}

// Revenue by resident/room (paid)
$revenueByResident = [];
$stmt = $conn->prepare("
  SELECT
    c.ResidentID,
    c.RoomNum,
    SUM(b.TotalPrice) AS TotalAmountCollected
  FROM Bill AS b
  JOIN Contract AS c ON b.ContractID = c.ContractID
  WHERE b.IsPaid = '1'
  GROUP BY c.ContractID, c.ResidentID, c.RoomNum
  ORDER BY TotalAmountCollected DESC
");
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
  $revenueByResident[] = $row;
}
$stmt->close();

// Unpaid bills
$unpaidBills = [];
$stmt = $conn->prepare("
  SELECT
    c.ResidentID,
    c.RoomNum,
    SUM(b.TotalPrice) AS TotalAmountOwed,
    COUNT(b.PaymentCode) AS UnpaidBills
  FROM Bill AS b
  JOIN Contract AS c ON b.ContractID = c.ContractID
  WHERE b.IsPaid = '0'
  GROUP BY c.ContractID, c.ResidentID, c.RoomNum
  ORDER BY TotalAmountOwed DESC
");
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
  $unpaidBills[] = $row;
}
$stmt->close();

// Revenue by service
$revenueByService = [];
$stmt = $conn->prepare("
  SELECT
    i.ServiceName,
    SUM(b.TotalPrice) AS TotalRevenue,
    COUNT(b.PaymentCode) AS TotalPaidBills
  FROM Bill AS b
  JOIN Item AS i ON b.ItemID = i.ItemID
  WHERE b.IsPaid = '1'
  GROUP BY i.ItemID, i.ServiceName
  ORDER BY TotalRevenue DESC
");
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
  $revenueByService[] = $row;
}
$stmt->close();

$conn->close();

echo json_encode([
  'success' => true,
  'data' => [
    'revenueByResident' => $revenueByResident,
    'unpaidBills' => $unpaidBills,
    'revenueByService' => $revenueByService
  ]
]);
?>
