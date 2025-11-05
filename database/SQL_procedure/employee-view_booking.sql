/*
 * USE CASE 1: Employee views all bookings
 * Retrieves a comprehensive list of all bookings,
 * including resident name, facility name, status,
 * and the employee who processed the booking.
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