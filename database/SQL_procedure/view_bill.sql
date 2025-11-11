--  Get info for workflow, initialize Contract if there is none, view billings  --

-- find the contract when sign in
DROP PROCEDURE IF EXISTS ViewBill;

DELIMITER $$
CREATE PROCEDURE ViewBill (IN c_ResidentID INT)
BEGIN
	DECLARE v_ContractID INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'View bill failed';
	END;
    START TRANSACTION;
		SELECT ContractID INTO v_ContractID FROM Contract WHERE ResidentID = c_ResidentID AND IsActive = 'true';
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
		  b.CreatedAt DESC,   -- Show the most recent bills first
		  b.IsPaid;
		COMMIT;
	END$$
DELIMITER ;

-- TEST
CALL ViewBill(1);


  --
   
  -- View all unpaid bill -> handle in code
  
  -- Mark a specific bill as paid
UPDATE Bill
SET
  IsPaid = 'true'
WHERE
  PaymentCode = 5001      -- The ID of the bill they just paid, fix in code
  AND IsPaid = 'false';   -- Only update if the bill is currently unpaid