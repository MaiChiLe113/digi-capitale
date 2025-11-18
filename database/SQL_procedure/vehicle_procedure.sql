-- DROP PROCEDURE IF EXISTS AddVehicle;     ** Only use this line when you need to recreate the procedure **
-- Add new vehicle
DELIMITER $$
CREATE PROCEDURE AddVehicle(IN b_ResidentID INT, IN b_LeaseID INT, IN b_LicensePlate VARCHAR(20), IN b_VehicleType VARCHAR(50))   -- VehicleType: car, motorcycle, bicycle (use the same as this so can search and sort easier)
BEGIN  
	DECLARE v_CurrentVehi INT;
	DECLARE v_CardID INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			ROLLBACK;
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Fail to add vehicle.';
		END;
	START TRANSACTION;
		SELECT IFNULL(VehicleRegistered, 0) INTO v_CurrentVehi FROM Lease WHERE ResidentID = b_ResidentID AND LeaseID = b_LeaseID;
		-- Add the new vehicle, linking it to the resident's card
		SELECT CardID INTO v_CardID FROM card WHERE ResidentID = b_ResidentID LIMIT 1;
		INSERT INTO Vehicle (CardID, LicensePlate, VehicleType)
		VALUES (v_CardID, b_LicensePlate, b_VehicleType);
		-- Increment the counter on that resident's lease
		UPDATE Lease
		SET VehicleRegistered = v_CurrentVehi + 1
		WHERE LeaseID = b_LeaseID;
	COMMIT;
END$$
DELIMITER ;



-- Delete a vehicle
SELECT c.ResidentID
FROM vehicle v
JOIN card c ON v.CardID = c.CardID
WHERE v.LicensePlate = "29C-99999";

DELETE FROM vehicle
WHERE v.LicensePlate = "29C-99999" AND v.VehicleType = "car";

-- Decrement the counter on that resident's lease
UPDATE Lease
SET VehicleRegistered = VehicleRegistered - 1
WHERE
  ResidentID = 1440
  AND LeaseID = 1440
  AND VehicleRegistered > 0; -- Safety check to prevent going below 0



-- Change a vehicle
UPDATE vehicle v
JOIN card c ON v.CardID = c.CardID
SET v.LicensePlate = "29C-77777", v.VehicleType = "motorcycle"
WHERE c.ResidentID = 1440 AND v.LicensePlate = "29C-99999";

-- View all residents who have vehicle (cnay tmh k ro de lmj nen k sua nhe) +1 lam nghi la nen xoa
-- SELECT r.FirstName, r.LastName, l.RoomNum, l.BuildingID
-- FROM resident r
-- JOIN lease l ON r.ResidentID = l.ResidentID
-- WHERE l.VehicleRegistered = 1 AND l.BuildingID = "IDID";

-- View all vehicle belong to pple in a room (assume code has RoomID)
SELECT
  v.VehicleID,
  v.LicensePlate,
  v.VehicleType,
  r.FirstName,
  r.LastName,
  rm.RoomNum
FROM
  Room AS rm
  JOIN Lease AS l ON rm.RoomNum = l.RoomNum
  JOIN Resident AS r ON l.ResidentID = r.ResidentID
  JOIN Card AS c ON r.ResidentID = c.ResidentID
  JOIN Vehicle AS v ON c.CardID = v.CardID
WHERE
  rm.RoomNum = '1001' AND rm.BuildingID = '1';