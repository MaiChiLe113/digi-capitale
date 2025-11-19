<?php
/**
 * Handle Booking Action API
 * Calls ConfirmBook or RejectBook stored procedures
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'config/database.php';

try {
    // Get JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!isset($data['bookID']) || !isset($data['action'])) {
        throw new Exception('Missing required parameters: bookID and action');
    }

    $bookID = intval($data['bookID']);
    $action = $data['action'];

    if (!in_array($action, ['approve', 'reject'])) {
        throw new Exception('Invalid action. Must be "approve" or "reject"');
    }

    $conn = getDBConnection();

    if (!$conn) {
        throw new Exception('Database connection failed');
    }

    // Call the appropriate stored procedure
    if ($action === 'approve') {
        // Call ConfirmBook procedure
        $stmt = $conn->prepare("CALL ConfirmBook(?)");
        $stmt->bind_param("i", $bookID);
    } else {
        // Call RejectBook procedure
        $stmt = $conn->prepare("CALL RejectBook(?)");
        $stmt->bind_param("i", $bookID);
    }

    if (!$stmt->execute()) {
        throw new Exception('Failed to execute procedure: ' . $stmt->error);
    }

    $stmt->close();
    $conn->close();

    echo json_encode([
        'success' => true,
        'message' => 'Booking ' . ($action === 'approve' ? 'approved' : 'rejected') . ' successfully'
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>