--Get UserID by Email
SELECT UserID FROM users WHERE Email = ?
--Check residentID exists
SELECT ResidentID FROM resident WHERE ResidentID = ?
--create user/ sign up
INSERT INTO users (ResidentID, Email, PasswordHash, Role, IsActive) 
VALUES (?, ?, ?, "resident", 1)

-- Login procedure
-- Get user info by email
SELECT UserID, PasswordHash, Role, ResidentID FROM users WHERE Email = ?

--validation
-- password_verify($inputPassword, $user['PasswordHash'])