<?php
/**
 * Get Utilities API
 * Fetches utilities from item table with name and condition only
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require 'config/database.php';

try {
    $conn = getDBConnection();

    if (!$conn) {
        throw new Exception('Database connection failed');
    }

    // Fetch utilities from item table
    $sql = "SELECT ItemID, ServiceName, `Condition` FROM `item` WHERE `Type` = 'Utility' ORDER BY ServiceName";
    $result = $conn->query($sql);

    if (!$result) {
        throw new Exception('Query failed: ' . $conn->error);
    }

    $utilities = [];
    while ($row = $result->fetch_assoc()) {
        $utilities[] = [
            'id' => $row['ItemID'],
            'name' => $row['ServiceName'],
            'condition' => $row['Condition'] ?? 'Available' 
        ];
    }

    echo json_encode($utilities);
    $conn->close();

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch utilities: ' . $e->getMessage()
    ]);
}
?>
