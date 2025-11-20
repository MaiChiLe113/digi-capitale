<?php
$origin = $_SERVER['HTTP_ORIGIN'] ?? 'http://localhost:3000';
header("Access-Control-Allow-Origin: $origin");
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

$action = $_GET['action'] ?? '';

// Handle routes
if ($action === 'signup') {
  require 'signup.php';
} else if ($action === 'login') {
  require 'login.php';
} else if ($action === 'getProfile') {
  require 'getProfile.php';
} else if ($action === 'updateEmail') {
  require 'updateEmail.php';
} else if ($action === 'updatePhoto') {
  require 'updatePhoto.php';
} else if ($action === 'updatePassword') {
  require 'updatePassword.php';
} else if ($action === 'deletePhoto') {
  require 'deletePhoto.php';
} else if ($action === 'getApartmentInfo') {
  require 'getApartment.php';
} else if ($action === 'getBookings') {
  require 'getBookings.php';
} else if ($action === 'handleBookings') {
  require 'handleBookings.php';
} else if ($action === 'getUtilities') {
  require 'getUtilities.php';
} else {
  http_response_code(404);
  echo json_encode(['success' => false, 'message' => 'Endpoint not found']);
}
?>