--  Get info for workflow, initialize Contract if there is none, view billings  --

-- find the contract when sign in
DROP PROCEDURE IF EXISTS ViewBill;
DELIMITER $$
CREATE PROCEDURE ViewBill (IN c_ResidentID INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'View bill failed';
	END;
    START TRANSACTION;
	-- view all bills for a specific resident
		SELECT
		  b.PaymentCode,      -- unique ID for the bill
		  i.ServiceName,      
		  b.TotalPrice,
		  b.CreatedAt,        
		  b.IsPaid,
          b.ContractID
		FROM
		  Bill AS b
		  LEFT JOIN Item AS i ON b.ItemID = i.ItemID
		  JOIN Contract AS c ON b.ContractID = c.ContractID
		WHERE
		  c.ResidentID = c_ResidentID
          -- Uncomment if need to filter by specific month/year
        --   AND YEAR(b.CreatedAt) = 2025
        --   AND MONTH (b.CreatedAt) = 11          
		ORDER BY
		  b.CreatedAt DESC,   -- Show the most recent bills first
		  b.IsPaid;
		COMMIT;
	END$$
DELIMITER ;

-- de trong code thi chi de dong nay thoi, DO NOT RE create lai ca cai procedure nhaa,
CALL ViewBill(846);


