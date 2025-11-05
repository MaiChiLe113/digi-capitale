-- View available utilities
SELECT * FROM `item` WHERE `Type` = 'Utility';

-- View available slots of a utility
SELECT SlotID, SlotDay, StartTime, `Status`, item.ServiceName FROM `slots`
JOIN `item`
ON slots.ItemID = item.ItemID
WHERE `Status` = 'Open' AND item.Type = 'Utility';


-- User booking service (ex user book slot 26, NEED TO ADD CONTRACT ID AS VARIABLES-> change state to pending)
UPDATE slots
SET `Status` = 'Pending' AND TimeStamp = current_timestamp() AND `ContractID` = 1
WHERE SlotID = 26 AND SlotDay = '2024-12-27'
;

-- Receptionist view pending booking list 
SELECT * FROM slots WHERE `Status` = 'Pending' ORDER BY TimeStamp;

-- Approve a reservation
UPDATE slots
SET `Status` = 'Closed'
WHERE SlotID = 26 AND SlotDay = '2024-12-27'
;


-- Create bill when the reservation is confirmed
INSERT INTO bill(ContractID, ItemID, TotalPrice, Quantity) VALUES();

-- Reject a reservation
UPDATE slots
SET `Status` = 'Open'
WHERE SlotID = 26 AND SlotDay = '2024-12-27'
;



 

