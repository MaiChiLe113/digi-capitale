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
WHERE ServiceName LIKE @Search;

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
CALL BookUtility(1, 100, 1, 'Hello myname is LAm');    

-- Calculate available slots to display 
SELECT SlotID, COUNT(*) FROM booking WHERE `Status` = 'Registered' OR `Status` = 'Confirmed' GROUP BY SlotID;

-- Receptionist view pending booking list 
SELECT * FROM booking WHERE `Status` = 'Registered' ORDER BY TimeStamp;



-- Approve a reservation
DROP PROCEDURE IF EXISTS ConfirmBook;
DELIMITER $$
CREATE PROCEDURE ConfirmBook (IN b_BookID INT, IN b_ItemID INT, IN b_Quantity INT)
BEGIN
	DECLARE v_TotalPrice DECIMAL(10, 2);
    DECLARE v_ContractID INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SIGNAL SQLSTATE '45000'SET MESSAGE_TEXT = 'Confirm booking failed.';
	END;
    
    START TRANSACTION;
		SELECT ContractID INTO v_ContractID FROM booking WHERE BookID = b_BookID;
		SET v_TotalPrice = b_Quantity * (SELECT COALESCE(UnitPrice, 0) FROM item WHERE ItemID = b_ItemID);
		UPDATE booking
		SET `Status` = 'Confirmed'
		WHERE BookID = b_BookID AND `Status` = 'Registered';
        INSERT INTO bill(ContractID, ItemID, TotalPrice, Quantity, IsPaid, CreatedAt) VALUES(v_ContractID, b_ItemID, v_TotalPrice, b_Quantity, default(IsPaid), default(CreatedAt));
	COMMIT;
END$$
DELIMITER ;

CALL ConfirmBook(2, 1, 10);

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

CALL RejectBook(1)
