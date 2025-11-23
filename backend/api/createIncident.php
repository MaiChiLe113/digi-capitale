<?php
require 'config/database.php';

$conn = getDBConnection();
if (!$conn) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// GET - Fetch items for dropdown
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT ItemID, ServiceName, Type FROM item ORDER BY ServiceName";
    $result = $conn->query($sql);

    $items = [];
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $items[] = $row;
        }
    }

    echo json_encode(['success' => true, 'items' => $items]);
    $conn->close();
    exit;
}

// POST - Create incident
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['itemId'], $data['description'], $data['impactLevel'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

$itemId = (int)$data['itemId'];
$description = trim($data['description']);
$impactLevel = $data['impactLevel'];

// Validate impact level
if (!in_array($impactLevel, ['Low', 'Medium', 'High'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid impact level']);
    exit;
}

// Call the stored procedure
$stmt = $conn->prepare('CALL ReportIncident(?, ?, ?)');
$stmt->bind_param('iss', $itemId, $description, $impactLevel);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    echo json_encode([
        'success' => true,
        'message' => 'Incident reported successfully',
        'incidentId' => $row['IncidentID'] ?? null
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to report incident: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
