-- View available utilities
SELECT * FROM `item` WHERE `Type` = 'Utility';

-- View available slots of a utility
SELECT SlotID, SlotDay, StartTime, `Status`, item.ServiceName FROM `slots`
JOIN `item`
ON slots.ItemID = item.ItemID
WHERE `Status` = 'Open';

-- Search for specific utility -CHANGE SEARCH VARIABLE
SELECT SlotID, SlotDay, StartTime, `Status`, item.ServiceName FROM `slots`
JOIN `item`
ON slots.ItemID = item.ItemID
WHERE ServiceName LIKE 'sth';

-- User books utility (ex user book slot 26, create a reservation)
SELECT `phone` FROM resident WHERE `residentID` = 1;
INSERT INTO booking (ContractID, SlotID, Phone, Status, Note)  values (1, 26, 1234567890, 'Registered', '');

-- Calculate available slots to display 
SELECT SlotID, COUNT(*) FROM booking WHERE `Status` = 'Pending' OR `Status` = 'Confirmed' GROUP BY SlotID;

-- Update status if book full
UPDATE Slots SET `Status` = 'Close';

-- Receptionist view pending booking list 
SELECT * FROM booking WHERE `Status` = 'Registered' ORDER BY TimeStamp;

-- Approve a reservation
UPDATE booking
SET `Status` = 'Confirmed'
WHERE BookID = 1 AND `Status` = 'Pending'
;

-- Create bill when the reservation is confirmed CHANGE VARIABLES
INSERT INTO bill(ContractID, ItemID, TotalPrice, IsPaid, Quantity) VALUES('contractid', 'itemid', '=quantity * unit price', 0, 'quantity');

-- Reject a reservation
UPDATE booking
SET `Status` = 'Rejected'
WHERE BookID = 1 AND `Status` = 'Pending';



 

