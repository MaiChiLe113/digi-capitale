<?php
/**
 * Database Configuration
 * MySQL connection using mysqli for XAMPP
 */

// Database credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'root'); // Use MAMP
//use XAMPP
// define('DB_PASS', '');
define('DB_NAME', 'digicapitale');

// Create connection function
function getDBConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conn->connect_error) {
        error_log("Connection failed: " . $conn->connect_error);
        return null;
    }
    
    $conn->set_charset("utf8mb4");
    
    return $conn;
}
?>