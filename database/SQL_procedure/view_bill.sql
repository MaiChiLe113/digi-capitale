--  Get info for workflow, initialize Contract if there is none, view billings  --

-- find the contract when sign in
SELECT ContractID
FROM Contract
WHERE ResidentID = 101 AND IsActive = 'true';

-- view all bills for a specific resident
SELECT
  b.PaymentCode,      -- unique ID for the bill
  i.ServiceName,      
  b.TotalPrice,
  b.CreatedAt,        
  b.IsPaid,           -- 'true' or 'false'
  c.ContractID        -- Which contract this bill is for
FROM
  Bill AS b
  JOIN Item AS i ON b.ItemID = i.ItemID
  JOIN Contract AS c ON b.ContractID = c.ContractID
WHERE
  c.ResidentID = 101  -- Use the logged-in resident's ID
ORDER BY
  b.CreatedAt DESC;   -- Show the most recent bills first
  
  -- View all unpaid bill -> handle in code
  
  -- Mark a specific bill as paid
UPDATE Bill
SET
  IsPaid = 'true'
WHERE
  PaymentCode = 5001      -- The ID of the bill they just paid, fix in code
  AND IsPaid = 'false';   