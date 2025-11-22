<?php

require 'config/database.php';

$conn = getDBConnection();
if (!$conn) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Database connection failed']);
  exit;
}

// Usage frequency by utilities
$usageFrequency = [];
$stmt = $conn->prepare("
  SELECT
    i.ServiceName,
    COUNT(b.BookID) AS ConfirmedBookings
  FROM Booking AS b
  JOIN Slots AS s ON b.SlotID = s.SlotID
  JOIN Item AS i ON s.ItemID = i.ItemID
  WHERE b.Status = 'confirmed'
  GROUP BY i.ServiceName
  ORDER BY ConfirmedBookings DESC
");
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
  $usageFrequency[] = $row;
}
$stmt->close();

// Monthly revenue
$monthlyRevenue = [];
$stmt = $conn->prepare("
  SELECT
    YEAR(CreatedAt) AS BillYear,
    MONTH(CreatedAt) AS BillMonth,
    SUM(TotalPrice) AS TotalCollected
  FROM Bill
  WHERE IsPaid = '1'
  GROUP BY YEAR(CreatedAt), MONTH(CreatedAt)
  ORDER BY BillYear DESC, BillMonth DESC
  LIMIT 12
");
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
  $monthlyRevenue[] = $row;
}
$stmt->close();

// Total usage minutes by service
$usageMinutes = [];
$stmt = $conn->prepare("
  SELECT
    i.ServiceName,
    SUM(TIMESTAMPDIFF(MINUTE, b.CheckInTime, b.CheckOutTime)) AS TotalUsageMinutes
  FROM Booking AS b
  JOIN Slots AS s ON b.SlotID = s.SlotID
  JOIN Item AS i ON s.ItemID = i.ItemID
  WHERE b.CheckInTime IS NOT NULL AND b.CheckOutTime IS NOT NULL
  GROUP BY i.ItemID, i.ServiceName
  ORDER BY TotalUsageMinutes DESC
");
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
  $usageMinutes[] = $row;
}
$stmt->close();

$conn->close();

echo json_encode([
  'success' => true,
  'data' => [
    'usageFrequency' => $usageFrequency,
    'monthlyRevenue' => $monthlyRevenue,
    'usageMinutes' => $usageMinutes
  ]
]);
?>
