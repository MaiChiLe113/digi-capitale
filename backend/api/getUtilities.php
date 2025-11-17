<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
require 'config/database.php';

$conn = getDBConnection();
if (!$conn) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$sql = "SELECT ItemID, ServiceName, Type, Subscription FROM item WHERE Type IN ('Service', 'Utility') ORDER BY Type, ServiceName ASC";
$result = $conn->query($sql);

$sections = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $section = $row['Type']; // "Service" or "Utility"
        
        // if not exists
        if (!isset($sections[$section])) {
            $sections[$section] = [
                'section' => $section === 'Service' ? 'Services' : 'Utilities',
                'items' => []
            ];
        }
        
        // Determine status
        $status = 'Available'; // default
        if ($row['Subscription'] === 'Timely') {
            $status = 'Available';
        } elseif ($row['Subscription'] === 'Monthly' || $row['Subscription'] === 'Yearly') {
            $status = 'Available';
        }
        
        // Map ItemID
        $iconKey = strtolower(str_replace(' ', '_', $row['ServiceName']));
        
        $sections[$section]['items'][] = [
            'name' => $row['ServiceName'],
            'status' => $status,
            'iconKey' => $iconKey,
            'itemId' => $row['ItemID']
        ];
    }
}

// Convert associative array to indexed array for JSON output
$output = array_values($sections);

echo json_encode($output);
$conn->close();
?>
