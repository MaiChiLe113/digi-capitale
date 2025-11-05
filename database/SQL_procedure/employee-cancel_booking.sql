/*
 * USE CASE 3: Employee Cancels a Booking
 * Defines a stored procedure for an employee to cancel an existing booking.
 * This procedure uses a TRANSACTION to:
 * 1. Check if the booking's status is 'Booked'.
 * 2. Update the booking's status to 'Cancelled'.
 * 3. Update the corresponding slot's Status back to 'Opened'.
*/

DELIMITER $$

CREATE PROCEDURE sp_EmployeeCancelBooking(
    IN in_booking_id INT
)
BEGIN
    -- Declare variables to find the corresponding slot
    DECLARE v_facility_id INT;
    DECLARE v_slot_date DATE;
    DECLARE v_start_time TIME;
    DECLARE v_current_status ENUM('Booked', 'Cancelled', 'Completed');

    -- Start the transaction
    START TRANSACTION;

    -- 1. Check the booking status and lock the row
    SELECT facility_id, booking_date, start_time, status
    INTO v_facility_id, v_slot_date, v_start_time, v_current_status
    FROM Booking
    WHERE booking_id = in_booking_id
    FOR UPDATE;

    -- 2. Check if the booking is currently 'Booked'
    IF v_current_status = 'Booked' THEN

        -- 3. Update the Booking status to 'Cancelled'
        UPDATE Booking
        SET status = 'Cancelled'
        WHERE booking_id = in_booking_id;

        -- 4. Update the corresponding Slot status back to 'Opened'
        UPDATE Slots
        SET Status = 'Opened'
        WHERE facility_id = v_facility_id
          AND slot_date = v_slot_date
          AND start_time = v_start_time;

        -- 5. Commit the transaction
        COMMIT;
        SELECT 'Booking cancelled successfully!' AS Result;
    ELSE
        -- 6. Rollback if the booking was not in a 'Booked' state
        ROLLBACK;
        SELECT 'Failed: Booking is not in a cancellable state.' AS Result;
    END IF;

END$$

DELIMITER ;