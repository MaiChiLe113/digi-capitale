/*
================================================================================
-- FILE: employee_booking_procedures.sql
-- DESCRIPTION: Contains all queries and stored procedures for
--              the 'Control Booking System (Employee Side)' task.
-- USE CASES:
-- 1. Employee views all existing bookings.
-- 2. Employee creates a new booking for a resident (sp_EmployeeCreateBooking).
-- 3. Employee cancels an existing booking for a resident (sp_EmployeeCancelBooking).
--
-- Note: Run this file once to create the stored procedures.
================================================================================
*/

-- Make sure to select your database first, e.g.:
-- USE capitale_db;


/*
================================================================================
-- USE CASE 1: Employee Views All Bookings
-- Retrieves a list of all bookings with resident, facility, and employee names.
================================================================================
*/
SELECT
    b.booking_id,
    r.full_name AS resident_name,
    f.Name AS facility_name,
    b.booking_date,
    b.start_time,
    b.status AS booking_status,
    e.full_name AS employee_name
FROM
    Booking AS b
JOIN
    Resident AS r ON b.resident_id = r.resident_id
JOIN
    Facility AS f ON b.facility_id = f.facility_id
LEFT JOIN -- Use LEFT JOIN in case booking was made by system (employee_id is NULL)
    Employee AS e ON b.employee_id = e.employee_id
ORDER BY
    b.booking_date DESC, b.start_time;


/*
================================================================================
-- USE CASE 2: Employee Creates a Booking for Resident
-- Defines a stored procedure for an employee to create a new booking.
-- This procedure uses a TRANSACTION (Week 8 Topic) to:
-- 1. Check if the slot Status is 'Opened'.
-- 2. Update the slot's Status to 'Closed'.
-- 3. Insert the new record into the Booking table with 'Booked' status
--    and the employee's ID.
================================================================================
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

    -- Start the transaction
    START TRANSACTION;

    -- 1. Check slot availability and lock the row for update
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


/*
================================================================================
-- USE CASE 3: Employee Cancels a Booking
-- Defines a stored procedure for an employee to cancel an existing booking.
-- This procedure uses a TRANSACTION (Week 8 Topic) to:
-- 1. Check if the booking's status is 'Booked'.
-- 2. Update the booking's status to 'Cancelled'.
-- 3. Update the corresponding slot's Status back to 'Opened'.
================================================================================
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