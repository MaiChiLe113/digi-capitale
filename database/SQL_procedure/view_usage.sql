-- View all usage
SELECT * 
FROM booking AS b
JOIN contract AS c ON c.ContractID = b.ContractID
WHERE b.Status = 'Confirmed'

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