<?php
require 'config/database.php';

// Test database connection
$conn = getDBConnection();
if (!$conn) {
  echo "Database connection failed";
  exit;
}

echo "✓ Database connected\n\n";

// Simple test first - check if resident table exists
$testQuery = $conn->query("SELECT * FROM resident LIMIT 1");
if (!$testQuery) {
  echo "Error querying resident table: " . $conn->error;
  exit;
}

echo "✓ Resident table exists\n\n";

// Test query - get resident 1
$residentId = 1;

// Try simple query first
$query = "SELECT r.ResidentID, r.FirstName, r.LastName, r.Email, r.Image FROM resident r WHERE r.ResidentID = " . intval($residentId);

$result = $conn->query($query);
if (!$result) {
  echo "Query failed: " . $conn->error;
  exit;
}

if ($result->num_rows === 0) {
  echo "No resident found with ID 1\n";
  echo "Available residents:\n";
  $allResidents = $conn->query("SELECT ResidentID, FirstName, LastName FROM resident LIMIT 10");
  while ($row = $allResidents->fetch_assoc()) {
    echo json_encode($row) . "\n";
  }
  exit;
}

$profile = $result->fetch_assoc();

echo "✓ Resident 1 found!\n\n";
echo "Data:\n";
echo json_encode($profile, JSON_PRETTY_PRINT);

$conn->close();
?>