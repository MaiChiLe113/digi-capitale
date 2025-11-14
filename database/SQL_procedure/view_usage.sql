-- View all usage
SELECT * 
FROM booking AS b
JOIN contract AS c ON c.ContractID = b.ContractID
WHERE b.Status = 'Confirmed';

-- Monitor usage frequency by utilities
SELECT
  i.ServiceName,
  COUNT(b.BookID) AS ConfirmedBookings
FROM
  Booking AS b
  JOIN Slots AS s ON b.SlotID = s.SlotID
  JOIN Item AS i ON s.ItemID = i.ItemID
WHERE
  b.Status = 'confirmed'
  -- Filter by a specific time range (e.g., November 2025), un comment dong duoi neu muon loc theo thoi gian
  -- AND s.SlotDay BETWEEN '2025-11-01' AND '2025-11-30'
GROUP BY
  i.ServiceName
ORDER BY
  ConfirmedBookings DESC;

-- Checkin/out and monitoring process
-- check in
UPDATE Booking
SET
  CheckInTime = NOW()  -- Sets the check-in time to this exact moment
WHERE
  BookID = 123
  AND Status = 'confirmed'   -- Can only check-in to a confirmed booking
  AND CheckInTime IS NULL; -- Prevents checking in twice

  -- check out
UPDATE Booking
SET
  CheckOutTime = NOW() -- Sets the check-out time to this exact moment
WHERE
  BookID = 123
  AND CheckInTime IS NOT NULL -- Must check-in before checking out
  AND CheckOutTime IS NULL; -- Prevents checking out twice

-- Monitor actual úage time
SELECT
  b.BookID,
  i.ServiceName,
  c.RoomNum,
  s.SlotDay,
  s.StartTime AS ScheduledTime,
  b.CheckInTime,
  b.CheckOutTime,
  -- This calculates the actual duration in minutes
  TIMESTAMPDIFF(MINUTE, b.CheckInTime, b.CheckOutTime) AS ActualUsageMinutes
FROM
  Booking AS b
  JOIN Slots AS s ON b.SlotID = s.SlotID
  JOIN Item AS i ON s.ItemID = i.ItemID
  JOIN Contract AS c ON b.ContractID = c.ContractID
WHERE
  b.Status = 'confirmed'
  AND b.CheckInTime IS NOT NULL
  AND b.CheckOutTime IS NOTT NULL
ORDER BY
  b.CheckInTime DESC; -- Show most recent check-ins first


-- Calculate actual usage for each utilities (check-in to check-out)
SELECT
  i.ServiceName,
  SUM(TIMESTAMPDIFF(MINUTE, b.CheckInTime, b.CheckOutTime)) AS TotalUsageMinutes
FROM
  Booking AS b
  -- Join to Slots to get the ItemID
  JOIN Slots AS s ON b.SlotID = s.SlotID
  -- Join to Item to get the ServiceName
  JOIN Item AS i ON s.ItemID = i.ItemID
WHERE
  -- Only include bookings that are fully complete
  b.CheckInTime IS NOT NULL
  AND b.CheckOutTime IS NOT NULL
GROUP BY
  i.ItemID, i.ServiceName  -- Group all bookings for the same service
ORDER BY
  TotalUsageMinutes DESC;


-- view peak usage time (most bookings window)
SELECT
  s.StartTime,
  COUNT(b.BookID) AS TotalBookings
FROM
  Booking AS b
  JOIN Slots AS s ON b.SlotID = s.SlotID
WHERE
  b.Status = 'confirmed'
GROUP BY
  s.StartTime
ORDER BY
  TotalBookings DESC;