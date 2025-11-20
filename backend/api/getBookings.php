<?php
/**
 * Get Booking Requests API
 * Fetches all registered bookings for receptionist to approve/reject
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once 'config/database.php';

try {
    $conn = getDBConnection();

    if (!$conn) {
        throw new Exception('Database connection failed');
    }

    // Get status filter from query parameter (default: 'Registered')
    $statusFilter = $_GET['status'] ?? 'Registered';

    // Query to get bookings based on status filter
    // Based on: SELECT * FROM booking WHERE Status = 'Registered' ORDER BY TimeStamp - Lam's query
    $query = "SELECT
                b.BookID,
                b.Email as UserEmail,
                b.TimeStamp,
                b.Status,
                s.SlotDay as BookingDate,
                s.StartTime as BookingTime,
                i.ServiceName as UtilityName
              FROM booking b
              JOIN slots s ON b.SlotID = s.SlotID
              JOIN item i ON s.ItemID = i.ItemID
              WHERE ";

    // Handle different status filters --> Tab
    if ($statusFilter === 'solved') {
        $query .= "b.Status IN ('Confirmed', 'Rejected')";
    } else {
        $query .= "b.Status = 'Registered'";
    }

    $query .= " ORDER BY b.TimeStamp DESC";

    $result = $conn->query($query);

    if (!$result) {
        throw new Exception('Query failed: ' . $conn->error);
    }

    $bookings = [];
    while ($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }

    echo json_encode($bookings);

    $conn->close();

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch bookings: ' . $e->getMessage()
    ]);
}
?>