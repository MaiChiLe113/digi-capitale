-- Add new vehicle
-- Assume ResidentID=1440 and LeaseID=1440 are known by the app (t modify user nay co du ttin)
SELECT VehicleRegistered
FROM Lease
WHERE ResidentID = 1440 AND LeaseID = 1440;
-- Add the new vehicle, linking it to the resident's card
SELECT CardID FROM card WHERE ResidentID = 1440 LIMIT 1;
INSERT INTO Vehicle (CardID, LicensePlate, VehicleType)
VALUES (1001, '29C-88888', 'Car');	-- insert card value, cnay cung la cua user tren

-- Increment the counter on that resident's lease
UPDATE Lease
SET VehicleRegistered = VehicleRegistered + 1
WHERE ResidentID = 1440 AND LeaseID = 1440;




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

-- View all residents who have vehicle (cnay tmh k ro de lmj nen k sua nhe)
SELECT r.FirstName, r.LastName, l.RoomNum, l.BuildingID
FROM resident r
JOIN lease l ON r.ResidentID = l.ResidentID
WHERE l.VehicleRegistered = 1 AND l.BuildingID = "IDID";

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