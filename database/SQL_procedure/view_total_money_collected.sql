-- Vieww all money collected, grouped by resident and room number
SELECT
  c.ResidentID,
  c.RoomNum,
  SUM(b.TotalPrice) AS TotalAmountCollected
FROM
  Bill AS b
  JOIN Contract AS c ON b.ContractID = c.ContractID
WHERE
  b.IsPaid = '1'  -- Only counts bills that have been paid
  --  condition to filter for a specific month, comment to sort all the time
  AND YEAR(b.CreatedAt) = 2025
  AND MONTH(b.CreatedAt) = 11
  --
GROUP BY
  c.ContractID, c.ResidentID, c.RoomNum -- Group by contract to sum for each
ORDER BY
  TotalAmountCollected DESC; -- Show highest-paying residents first


-- *trong data cot IsPaid dang la 0 tat ca :))) t sua tam 5 cai thanh 1 de test

-- View total money collected in each month/year
SELECT
  YEAR(CreatedAt) AS BillYear,
  MONTH(CreatedAt) AS BillMonth,
  SUM(TotalPrice) AS TotalCollected
FROM
  Bill
WHERE
  IsPaid = '1'  -- Only count bills that have been collected
GROUP BY
  YEAR(CreatedAt),
  MONTH(CreatedAt)
ORDER BY
  BillYear,         -- Sort by year first
  BillMonth;        -- Then by month




-- View unpaid bills, order by amount
SELECT
  c.ResidentID,
  c.RoomNum,
  SUM(b.TotalPrice) AS TotalAmountOwed,
  COUNT(b.PaymentCode) AS UnpaidBillCount
FROM
  Bill AS b
  JOIN Contract AS c ON b.ContractID = c.ContractID
WHERE
  b.IsPaid = '0'  -- Only counts bills that are NOT paid
GROUP BY
  c.ContractID, c.ResidentID, c.RoomNum
ORDER BY
  TotalAmountOwed DESC;

-- View total money collected for each service/item
SELECT
  i.ServiceName,
  SUM(b.TotalPrice) AS TotalRevenue,
  COUNT(b.PaymentCode) AS TotalPaidBills
FROM
  Bill AS b
  JOIN Item AS i ON b.ItemID = i.ItemID
WHERE
  b.IsPaid = '1' -- Only counts collected revenue
GROUP BY
  i.ItemID, i.ServiceName
ORDER BY
  TotalRevenue DESC;
