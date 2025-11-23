<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
require 'config/database.php';

// Get email from query
$email = isset($_GET['email']) ? trim($_GET['email']) : '';

// If no email, return empty reservations
if (empty($email)) {
    echo json_encode([
        'today' => [],
        'upcoming' => [],
        'past' => []
    ]);
    exit;
}

$conn = getDBConnection();
if (!$conn) {
    http_response_code(500);
    echo json_encode([
        'today' => [],
        'upcoming' => [],
        'past' => []
    ]);
    exit;
}

// Fetch user's reservations from booking table joined with item and slots
// booking: BookID, Email, SlotID, Status, TimeStamp
// slots: SlotID, ItemID, SlotDay, StartTime, Capacity, Status
// item: ItemID, ServiceName
$sql = "SELECT
    b.BookID,
    b.SlotID,
    b.Email,
    b.Status AS BookingStatus,
    b.TimeStamp,
    i.ServiceName,
    i.ItemID,
    s.SlotDay,
    s.StartTime,
    s.Capacity,
    s.Status AS SlotStatus
FROM booking b
JOIN slots s ON b.SlotID = s.SlotID
JOIN item i ON s.ItemID = i.ItemID
WHERE b.Email = ?
ORDER BY s.SlotDay DESC, s.StartTime DESC";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        'today' => [],
        'upcoming' => [],
        'past' => []
    ]);
    exit;
}

$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

$today = [];
$upcoming = [];
$past = [];

$now = new DateTime('now');
$todayDate = $now->format('Y-m-d');

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $slotDay = $row['SlotDay']; // Format: YYYY-MM-DD
        $startTime = $row['StartTime']; // Format: HH:MM
        
        // Combine date and time for comparison
        $reservationDateTime = new DateTime($slotDay . ' ' . $startTime);
        
        // Determine action based on booking status
        $action = ($row['BookingStatus'] === 'Confirmed') ? 'Cancel' : 'Cancel';
        if ($reservationDateTime < $now) {
            $action = 'Book Again';
        }
        
        $item = [
            'BookID' => $row['BookID'],
            'SlotID' => $row['SlotID'],
            'name' => $row['ServiceName'],
            'time' => (new DateTime($slotDay))->format('d/m/Y') . ' - ' . $startTime,
            'slotDay' => $slotDay,
            'startTime' => $startTime,
            'status' => $row['BookingStatus'],
            'timestamp' => $row['TimeStamp'],
            'img' => '', // No image URL in DB
            'action' => $action
        ];
        
        // Categorize
        if ($slotDay === $todayDate && $reservationDateTime >= $now) {
            $today[] = $item;
        } elseif ($reservationDateTime < $now) {
            $past[] = $item;
        } else {
            $upcoming[] = $item;
        }
    }
}

// Sort 
usort($today, function($a, $b) { return strcmp($a['time'], $b['time']); });
usort($upcoming, function($a, $b) { return strcmp($a['time'], $b['time']); });
usort($past, function($a, $b) { return strcmp($b['time'], $a['time']); }); // Reverse for past

echo json_encode([
    'today' => $today,
    'upcoming' => $upcoming,
    'past' => $past
]);

$stmt->close();
$conn->close();
?>
