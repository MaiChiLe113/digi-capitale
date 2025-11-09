DELIMITER //
CREATE PROCEDURE ManageBooking(IN slotId INT, IN actionType VARCHAR(10))
BEGIN
    -- Start a transaction 
    START TRANSACTION;

    -- Approve booking
    IF actionType = 'Approve' THEN
        UPDATE Slots
        SET Status = 'Closed'
        WHERE SlotID = slotId AND Status = 'Pending';

        -- Check if any row was updated
        IF ROW_COUNT() > 0 THEN
            SELECT CONCAT('Booking for SlotID ', slotId, ' approved successfully!') AS Message;
            COMMIT; -- Confirm changes
        ELSE
            SELECT 'No booking found or already processed.' AS Message;
            ROLLBACK; -- Undo changes
        END IF;

    -- Reject booking
    ELSEIF actionType = 'Reject' THEN
        UPDATE Slots
        SET Status = 'Open'
        WHERE SlotID = slotId AND Status = 'Pending';

        IF ROW_COUNT() > 0 THEN
            SELECT CONCAT('Booking for SlotID ', slotId, ' rejected successfully!') AS Message;
            COMMIT;
        ELSE
            SELECT 'No booking found or already processed.' AS Message;
            ROLLBACK;
        END IF;

    -- Cancel booking
    ELSEIF actionType = 'Cancel' THEN
        UPDATE Slots
        SET Status = 'Open'
        WHERE SlotID = slotId AND Status = 'Closed';

        IF ROW_COUNT() > 0 THEN
            SELECT CONCAT('Booking for SlotID ', slotId, ' canceled successfully!') AS Message;
            COMMIT;
        ELSE
            SELECT 'No booking found or already canceled.' AS Message;
            ROLLBACK;
        END IF;

    -- Invalid action
    ELSE
        SELECT 'Invalid action. Use Approve, Reject, or Cancel.' AS Message;
        ROLLBACK;
    END IF;
END //

DELIMITER; 

-- exampple:
-- SELECT SlotID, SlotDay, Status FROM Slots WHERE SlotID = 50;
-- CALL ManageBooking(50, 'Approve');
-- or CALL ManageBooking(50, 'Reject');
-- or CALL ManageBooking(50, 'cancel');
