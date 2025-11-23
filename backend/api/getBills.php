<?php
/**
 * Get Bills API
 * Fetches all bills for the authenticated resident using ViewBill stored procedure
 * Returns bills grouped by month with service details and payment status
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'config/database.php';

// Get ResidentID from query parameter or header
$residentID = isset($_GET['residentID']) ? intval($_GET['residentID']) : null;

if (!$residentID) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Missing residentID parameter'
    ]);
    exit;
}

try {
    $conn = getDBConnection();

    if (!$conn) {
        throw new Exception('Database connection failed');
    }

    // Call the ViewBill stored procedure
    $stmt = $conn->prepare("CALL ViewBill(?)");
    if (!$stmt) {
        throw new Exception('Prepare failed: ' . $conn->error);
    }

    $stmt->bind_param('i', $residentID);
    
    if (!$stmt->execute()) {
        throw new Exception('Execute failed: ' . $stmt->error);
    }

    $result = $stmt->get_result();

    if (!$result) {
        throw new Exception('Get result failed: ' . $conn->error);
    }

    // Group bills by month
    $billsByMonth = [];
    
    while ($row = $result->fetch_assoc()) {
        // Format month from CreatedAt (e.g., "11/2025" from "2025-11-03")
        $createdAt = new DateTime($row['CreatedAt']);
        $monthKey = $createdAt->format('m/Y'); // Format as MM/YYYY

        if (!isset($billsByMonth[$monthKey])) {
            $billsByMonth[$monthKey] = [];
        }

        // Determine the icon type based on service name
        $iconType = 'Maintenance'; // default for all other services
        if (stripos($row['ServiceName'], 'water') !== false || stripos($row['ServiceName'], 'supply') !== false) {
            $iconType = 'Water';
        } else if (stripos($row['ServiceName'], 'electricity') !== false || stripos($row['ServiceName'], 'power') !== false) {
            $iconType = 'Electricity';
        } else if (stripos($row['ServiceName'], 'internet') !== false || stripos($row['ServiceName'], 'wifi') !== false) {
            $iconType = 'Internet';
        }

        $billsByMonth[$monthKey][] = [
            'id' => $row['PaymentCode'],
            'name' => $row['ServiceName'],
            'fee' => floatval($row['TotalPrice']),
            'status' => $row['IsPaid'] ? 'Paid' : 'Pending',
            'due' => $createdAt->format('d/m/Y'), // Format as DD/MM/YYYY
            'usage' => 'N/A', // Will be populated from usage data if available
            'icon' => $iconType
        ];
    }

    // Sort months in descending order (newest first)
    krsort($billsByMonth);

    echo json_encode([
        'success' => true,
        'data' => $billsByMonth
    ]);

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch bills: ' . $e->getMessage()
    ]);
}
?>
