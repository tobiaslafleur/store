SELECT BIN_TO_UUID(uuid) AS id, email, first_name, last_name, password, role
FROM users
WHERE uuid = UUID_TO_BIN(:id);