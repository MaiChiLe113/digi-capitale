<?php
/**
 * Book Utility API
 * Handles utility booking operations
 */

$origin = $_SERVER['HTTP_ORIGIN'] ?? 'http://localhost:3000';
header("Access-Control-Allow-Origin: $origin");
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'config/database.php';

$action = $_GET['action'] ?? '';

try {
    $conn = getDBConnection();

    if (!$conn) {
        throw new Exception('Database connection failed');
    }

    if ($action === 'getUtilitySlots') {
        handleGetUtilitySlots($conn);
    } elseif ($action === 'bookSlot') {
        handleBookSlot($conn);
    } else {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
    }

    $conn->close();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}

function handleGetUtilitySlots($conn) {
    $itemId = $_GET['itemId'] ?? null;

    if (!$itemId) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Item ID is required']);
        return;
    }

    $stmt = $conn->prepare("SELECT ItemID, ServiceName, UnitPrice, `Condition` FROM `item` WHERE ItemID = ? AND `Type` = 'Utility'");
    $stmt->bind_param('i', $itemId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Utility not found']);
        $stmt->close();
        return;
    }

    $utility = $result->fetch_assoc();
    $stmt->close();

    $today = date('Y-m-d');
    $slotQuery = "
        SELECT
            s.SlotID,
            s.SlotDay,
            s.StartTime,
            s.Capacity,
            s.Capacity - COALESCE((
                SELECT COUNT(*)
                FROM booking
                WHERE SlotID = s.SlotID
                AND (`Status` = 'Registered' OR `Status` = 'Confirmed')
            ), 0) AS RemainingCapacity
        FROM slots s
        WHERE s.ItemID = ?
        AND s.`Status` = 'Open'
        AND s.SlotDay >= ?
        ORDER BY s.SlotDay, s.StartTime
    ";

    $stmt = $conn->prepare($slotQuery);
    $stmt->bind_param('is', $itemId, $today);
    $stmt->execute();
    $result = $stmt->get_result();

    $slots = [];
    while ($row = $result->fetch_assoc()) {
        if ($row['RemainingCapacity'] > 0) {
            $slots[] = $row;
        }
    }

    $stmt->close();

    echo json_encode([
        'success' => true,
        'utility' => $utility,
        'slots' => $slots
    ]);
}

function handleBookSlot($conn) {
    $input = json_decode(file_get_contents('php://input'), true);

    $residentId = $input['residentId'] ?? null;
    $slotId = $input['slotId'] ?? null;
    $note = $input['note'] ?? '';

    if (!$residentId || !$slotId) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Resident ID and Slot ID are required']);
        return;
    }

    $stmt = $conn->prepare("SELECT ContractID FROM contract WHERE ResidentID = ? AND IsActive = 1 LIMIT 1");
    $stmt->bind_param('i', $residentId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'No active contract found for this resident']);
        $stmt->close();
        return;
    }

    $contract = $result->fetch_assoc();
    $contractId = $contract['ContractID'];
    $stmt->close();

    $stmt = $conn->prepare("CALL BookUtility(?, ?, ?, ?)");
    $stmt->bind_param('iiis', $residentId, $slotId, $contractId, $note);

    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Booking created successfully'
        ]);
    } else {
        throw new Exception('Failed to create booking: ' . $stmt->error);
    }

    $stmt->close();
}
?>
