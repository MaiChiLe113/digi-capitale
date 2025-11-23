
-- --------------------------------------------------------
-- PROCEDURE: Resident report a new incident
-- --------------------------------------------------------
DELIMITER //
CREATE PROCEDURE ReportIncident(
    IN p_ItemID INT,
    IN p_Description TEXT,
    IN p_ImpactLevel ENUM('Low', 'Medium', 'High')
)
BEGIN
    INSERT INTO incidents (ItemID, Description, ImpactLevel)
    VALUES (p_ItemID, p_Description, p_ImpactLevel);

    SELECT LAST_INSERT_ID() AS IncidentID, 'Incident reported successfully' AS Message;
END //
DELIMITER ;

-- Usage: CALL ReportIncident(1, 'Water leak in gym bathroom', 'High');


-- --------------------------------------------------------
-- Delete resolved incident
-- --------------------------------------------------------
DELETE FROM incidents
WHERE IncidentID = 123; --Hardcode

SELECT ROW_COUNT() AS Deleted;


-- Usage: CALL DeleteIncident(1)

-- View all incidents (for employee)
SELECT i.IncidentID, it.ServiceName, i.Description, i.ImpactLevel, i.TimeStamp
FROM incidents i
JOIN item it ON i.ItemID = it.ItemID
ORDER BY FIELD(i.ImpactLevel, 'High', 'Medium', 'Low'), i.TimeStamp DESC;

-- Filter by impact level
SELECT i.IncidentID, it.ServiceName, i.Description, i.ImpactLevel, i.TimeStamp
FROM incidents i
JOIN item it ON i.ItemID = it.ItemID
WHERE i.ImpactLevel = 'High'  -- Replace with 'Medium' or 'Low'
ORDER BY i.TimeStamp DESC;

-- Filter by item/service
SELECT i.IncidentID, it.ServiceName, i.Description, i.ImpactLevel, i.TimeStamp
FROM incidents i
JOIN item it ON i.ItemID = it.ItemID
WHERE i.ItemID = 1  -- Replace with actual ItemID
ORDER BY i.TimeStamp DESC;

-- Filter by date range
SELECT i.IncidentID, it.ServiceName, i.Description, i.ImpactLevel, i.TimeStamp
FROM incidents i
JOIN item it ON i.ItemID = it.ItemID
WHERE DATE(i.TimeStamp) BETWEEN '2025-01-01' AND '2025-12-31'
ORDER BY i.TimeStamp DESC;

-- Get incident statistics
SELECT
    COUNT(*) AS TotalIncidents,
    SUM(ImpactLevel = 'High') AS HighImpact,
    SUM(ImpactLevel = 'Medium') AS MediumImpact,
    SUM(ImpactLevel = 'Low') AS LowImpact
FROM incidents;

-- Get incident count by service
SELECT it.ServiceName, COUNT(i.IncidentID) AS IncidentCount
FROM item it
LEFT JOIN incidents i ON it.ItemID = i.ItemID
GROUP BY it.ItemID, it.ServiceName
ORDER BY IncidentCount DESC;

-- Get single incident by ID
SELECT i.IncidentID, i.ItemID, it.ServiceName, i.Description, i.ImpactLevel, i.TimeStamp
FROM incidents i
JOIN item it ON i.ItemID = it.ItemID
WHERE i.IncidentID = 1;  -- Replace with actual IncidentID

-- Get recent incidents (last 30 days)
SELECT i.IncidentID, it.ServiceName, i.Description, i.ImpactLevel, i.TimeStamp
FROM incidents i
JOIN item it ON i.ItemID = it.ItemID
WHERE i.TimeStamp >= DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY i.TimeStamp DESC;
