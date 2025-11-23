<?php
require 'config/database.php';

$conn = getDBConnection();
if (!$conn) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// GET - View all incidents
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT i.IncidentID, i.ItemID, it.ServiceName, i.Description, i.ImpactLevel, i.TimeStamp
            FROM incidents i
            JOIN item it ON i.ItemID = it.ItemID
            ORDER BY FIELD(i.ImpactLevel, 'High', 'Medium', 'Low'), i.TimeStamp DESC";

    $result = $conn->query($sql);

    $incidents = [];
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $incidents[] = $row;
        }
    }

    echo json_encode(['success' => true, 'incidents' => $incidents]);
    $conn->close();
    exit;
}

// DELETE - Remove resolved incident
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' ||
    ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['delete']))) {

    $data = json_decode(file_get_contents('php://input'), true);
    $incidentId = isset($data['incidentId']) ? (int)$data['incidentId'] : 0;

    if (!$incidentId) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Missing incident ID']);
        exit;
    }

    $stmt = $conn->prepare('DELETE FROM incidents WHERE IncidentID = ?');
    $stmt->bind_param('i', $incidentId);

    if ($stmt->execute() && $stmt->affected_rows > 0) {
        echo json_encode(['success' => true, 'message' => 'Incident deleted']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Incident not found']);
    }

    $stmt->close();
    $conn->close();
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
$conn->close();
?>
