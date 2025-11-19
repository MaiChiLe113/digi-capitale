-- View available utilities
SELECT * FROM `item` WHERE `Type` = 'Utility';

-- View available slots of a utility
SELECT SlotID, SlotDay, StartTime, `Status`, item.ServiceName FROM `slots`
JOIN `item`
ON slots.ItemID = item.ItemID
WHERE `Status` = 'Open';

-- Search for specific utility
SELECT SlotID, SlotDay, StartTime, `Status`, item.ServiceName FROM `slots`
JOIN `item`
ON slots.ItemID = item.ItemID
WHERE item.ServiceName LIKE '%Badminton%';


-- Book a slot for a utility
DROP PROCEDURE IF EXISTS BookUtility;
DELIMITER $$
CREATE PROCEDURE BookUtility (IN b_ResidentID INT, IN b_SlotID INT, IN b_ContractID INT, IN b_Note VARCHAR(255))
BEGIN
	DECLARE v_Email VARCHAR(255);
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Transaction failed. Booking was not recorded.';
    END;
	START TRANSACTION;
		SELECT Email INTO v_Email FROM resident WHERE ResidentID = b_ResidentID;
		INSERT INTO booking (ContractID, SlotID, Email, Status, Note) values (b_ContractID, b_SlotID, v_Email, 'Registered', b_Note);
		-- Update status if book full
		UPDATE Slots
		SET `Status` = 'Close'
		WHERE SlotID = b_SlotID
		AND Slots.Capacity - (SELECT Count(*) FROM booking WHERE SlotID = b_SlotID AND (`Status` = 'Registered' OR `Status` = 'Confirmed')) = 0;
	COMMIT;
END$$
DELIMITER ;

-- Test function
CALL BookUtility(1, 12, 775, 'Hello myname is Lam');  

-- Calculate available slots to display 
SELECT (Capacity - (SELECT Count(*) FROM booking WHERE SlotID = 12 AND (`Status` = 'Registered' OR `Status` = 'Confirmed'))) FROM slots WHERE SlotID = 12;

-- Receptionist view  booking list 
SELECT * FROM booking WHERE `Status` = 'Registered' ORDER BY TimeStamp;



-- PROCESS BOOKING REQUESTS--

-- Approve a reservation
DROP PROCEDURE IF EXISTS ConfirmBook;
DELIMITER $$
CREATE PROCEDURE ConfirmBook (IN b_BookID INT)   -- Quantity auto = 1 because 1 booking can only book 1 slot
BEGIN
	DECLARE v_TotalPrice DECIMAL(10, 2);
    DECLARE v_ContractID INT;
    DECLARE v_ItemID INT;
    DECLARE v_SlotId INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SIGNAL SQLSTATE '45000'SET MESSAGE_TEXT = 'Confirm booking failed.';
	END;
    
    START TRANSACTION;
		SELECT ContractID INTO v_ContractID FROM booking WHERE BookID = b_BookID;
        SELECT SlotID INTO v_SlotID FROM booking WHERE BookID = b_BookID;
        SELECT ItemID INTO v_ItemID FROM slots WHERE SlotID = v_SlotID;
		SET v_TotalPrice = 1 * (SELECT COALESCE(UnitPrice, 0) FROM item WHERE ItemID = v_ItemID);
		UPDATE booking
		SET `Status` = 'Confirmed'
		WHERE BookID = b_BookID AND `Status` = 'Registered';
        -- create bill for that book
        INSERT INTO bill(ContractID, ItemID, TotalPrice, Quantity, IsPaid, CreatedAt) VALUES(v_ContractID, v_ItemID, v_TotalPrice, 1, default(IsPaid), default(CreatedAt));
	COMMIT;
END$$
DELIMITER ;

CALL ConfirmBook(11);

-- Reject a reservation
DROP PROCEDURE IF EXISTS RejectBook;
DELIMITER $$
CREATE PROCEDURE RejectBook (IN b_BookID INT)
BEGIN
	DECLARE v_SlotID INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SIGNAL SQLSTATE '45000'SET MESSAGE_TEXT = 'Reject booking failed.';
	END;
    
    START TRANSACTION;
		SELECT SlotID INTO v_SlotID FROM booking WHERE BookID = b_BookID;
		UPDATE booking
		SET `Status` = 'Rejected'
		WHERE BookID = b_BookID AND `Status` = 'Registered';
        
        -- Update status if book available
		UPDATE Slots
		SET `Status` = 'Open'
		WHERE SlotID = v_SlotID
		AND Slots.Capacity - (SELECT Count(*) FROM booking WHERE SlotID = v_SlotID AND (`Status` = 'Registered' OR `Status` = 'Confirmed')) > 0;
	COMMIT;
END$$
DELIMITER ;

CALL RejectBook(29);


-- Redo reject booking (in case receptionist made a mistake and rejected/approve that booking)
UPDATE booking
		SET `Status` = 'Registered'
		WHERE BookID = 10 AND (`Status` = 'Rejected' OR `Status` = 'Confirmed');
        
        
UPDATE Bill
SET
  IsPaid = true
WHERE
  PaymentCode = 23      -- The ID of the bill they just paid, fix in code
  AND IsPaid = false;   
