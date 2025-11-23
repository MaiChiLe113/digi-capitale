<?php
/**
 * Pay Bill API
 * Updates IsPaid status to 1 (True)
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'config/database.php';

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['action'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid input data']);
    exit;
}

try {
    $conn = getDBConnection();
    if (!$conn) throw new Exception('Database connection failed');

    $action = $data['action'];
    $responseMsg = "";

    if ($action === 'pay_one') {
        // --- TRẢ 1 HÓA ĐƠN ---
        if (!isset($data['paymentCode'])) throw new Exception('Missing paymentCode');
        
        $paymentCode = intval($data['paymentCode']); // Ép kiểu về số nguyên cho chắc

        // Fix 1: Tên bảng là `bill`
        // Fix 2: PaymentCode là INT nên bind_param dùng 'i'
        $stmt = $conn->prepare("UPDATE bill SET IsPaid = 1 WHERE PaymentCode = ?");
        $stmt->bind_param('i', $paymentCode); 

        if ($stmt->execute()) {
            $responseMsg = "Bill paid successfully";
        } else {
            throw new Exception("Update failed: " . $stmt->error);
        }
        $stmt->close();

    } elseif ($action === 'pay_all') {
        // --- TRẢ HẾT (PAY ALL) ---
        if (!isset($data['residentID'])) throw new Exception('Missing residentID');
        
        $residentID = intval($data['residentID']);

        // Fix 3: Logic JOIN bảng
        // Vì bảng 'bill' chỉ có ContractID, nên phải JOIN sang bảng 'Contract' để check ResidentID.
        // Anh giả định bảng hợp đồng tên là `Contract` (hoặc `Contracts`). Em check lại tên bảng này nhé.
        
        $sql = "UPDATE bill b
                INNER JOIN Contract c ON b.ContractID = c.ContractID
                SET b.IsPaid = 1
                WHERE c.ResidentID = ? AND b.IsPaid = 0";

        $stmt = $conn->prepare($sql);
        
        if (!$stmt) {
             // Fallback: Nếu câu query trên lỗi (do sai tên bảng Contract), báo lỗi chi tiết
             throw new Exception("Prepare failed (Check Contract table name): " . $conn->error);
        }

        $stmt->bind_param('i', $residentID);

        if ($stmt->execute()) {
            $responseMsg = "All pending bills paid successfully";
        } else {
            throw new Exception("Update failed: " . $stmt->error);
        }
        $stmt->close();
        
    } else {
        throw new Exception("Invalid action");
    }

    $conn->close();

    echo json_encode([
        'success' => true,
        'message' => $responseMsg
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>