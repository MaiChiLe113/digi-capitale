-- Sql query for user profile

-- Get user profile by ResidentID
  SELECT
    r.ResidentID,
    r.FirstName,
    r.LastName,
    r.Email,
    r.Image,
    u.Role
  FROM resident r
  LEFT JOIN users u ON r.ResidentID = u.ResidentID
  WHERE r.ResidentID = ?;

  -- Get Apartment details
SELECT 
l.LeaseID, 
l.RoomNum, 
l.BuildingID, 
l.RoomType, 
b.BuildingName 
FROM lease l
    LEFT JOIN building b ON l.BuildingID = b.BuildingID
    WHERE l.ResidentID = " . intval($residentId) . " AND l.Status = 'active'
    LIMIT 1


-- Get Vehicle details
SELECT v.VehicleID, v.LicensePlate, v.Type
                FROM vehicle v
                LEFT JOIN card c ON v.CardID = c.CardID
                WHERE c.ResidentID = " . intval($residentId)";   -- variable from code

-- Get Family members details
SELECT DISTINCT r.ResidentID, CONCAT(r.FirstName, ' ', r.LastName) as Name, r.ResidentID as ID
               FROM resident r
               INNER JOIN lease l ON r.ResidentID = l.ResidentID
               WHERE l.BuildingID = " . intval($lease['BuildingID']) . " 
               AND l.RoomNum = '" . $conn->real_escape_string($lease['RoomNum']) . "'
               AND l.Status = 'active'
               ORDER BY r.ResidentID

-- Update user profile

-- Update Email
SELECT ResidentID FROM resident WHERE Email = ? AND ResidentID != ?   -- check if that email exists and being used by a different resident
UPDATE users SET Email = ? WHERE ResidentID = ?

-- Update Password
SELECT PasswordHash FROM users WHERE ResidentID = ?
UPDATE users SET PasswordHash = ? WHERE ResidentID = ?

-- Update Photo
SELECT Image FROM resident WHERE ResidentID = ?   -- get old image path to delete old file
UPDATE resident SET Image = ? WHERE ResidentID = ?

-- Delete Photo
SELECT Image FROM resident WHERE ResidentID = ?
UPDATE resident SET Image = NULL WHERE ResidentID = ?




