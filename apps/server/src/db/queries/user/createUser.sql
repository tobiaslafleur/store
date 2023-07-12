INSERT INTO users(uuid, email, first_name, last_name, password, role)
VALUES (UUID_TO_BIN(:id), :email, :first_name, :last_name, :password, :role);