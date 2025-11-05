/*
 * USE CASE 2: Employee Creates a Booking for Resident
 * Defines a stored procedure for an employee to create a new booking.
 * This procedure uses a TRANSACTION to:
 * 1. Check if the slot is 'Opened'.
 * 2. Update the slot's Status to 'Closed'.
 * 3. Insert the new record into the Booking table.
*/

DELIMITER $$

CREATE PROCEDURE sp_EmployeeCreateBooking(
    IN in_resident_id INT,
    IN in_slot_id INT,
    IN in_employee_id INT
)
BEGIN
    -- Declare variables to hold slot information
    DECLARE v_facility_id INT;
    DECLARE v_slot_date DATE;
    DECLARE v_start_time TIME;
    DECLARE v_end_time TIME;
    DECLARE v_current_status ENUM('Opened', 'Closed');

    -- Start the transaction (Week 8 Topic)
    START TRANSACTION;

    -- Check slot availability and lock the row for update
    SELECT facility_id, slot_date, start_time, end_time, Status
    INTO v_facility_id, v_slot_date, v_start_time, v_end_time, v_current_status
    FROM Slots
    WHERE slot_id = in_slot_id
    FOR UPDATE;

    -- 2. Check if the slot is 'Opened'
    IF v_current_status = 'Opened' THEN
    
        -- 3. Update the Slot status to 'Closed'
        UPDATE Slots
        SET Status = 'Closed'
        WHERE slot_id = in_slot_id;

        -- 4. Insert the new booking record
        INSERT INTO Booking (resident_id, facility_id, employee_id, booking_date, start_time, end_time, status)
        VALUES (in_resident_id, v_facility_id, in_employee_id, v_slot_date, v_start_time, v_end_time, 'Booked');

        -- 5. Commit the transaction
        COMMIT;
        SELECT 'Booking created successfully!' AS Result;
    ELSE
        -- 6. Rollback if the slot is already 'Closed'
        ROLLBACK;
        SELECT 'Failed: Slot is no longer available (Closed).' AS Result;
    END IF;

END$$

DELIMITER ;