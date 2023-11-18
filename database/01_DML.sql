-- Insert into Claim Formula
INSERT INTO Claim_Formula (formula, variable1, variable2, variable3)
VALUES
    ('S=s/f', NULL, NULL, NULL),
    ('S=s-f/f', NULL, NULL, NULL);

-- Insert into Company
INSERT INTO Company (name, operator, broker, claim_code)
VALUES
    ('Fettrominas', 'Unimed BH', 'GNDI', 1),
    ('Afu', 'Unimed Rio', 'GNDI', 1),
    ('Acate', 'Unimed Floripa', 'GNDI', 1);

-- Insert into Validator
INSERT INTO Validator (company_id, competence, lives, revenue, claim, loss_ratio, operator)
VALUES
    (1, '2023-09-01', 10, 5465, 1281.15, 23.44, 'Unimed BH'),
    (1, '2023-08-01', 8, 5894, 1508.35, 25.59, 'Unimed BH'),
    (1, '2023-07-01', 5, 4356, 421.90, 9.68, 'Unimed BH'),
    (2, '2023-08-01', 8, 2222, 1150.8, 51.79, 'Unimed Rio'),
    (2, '2023-07-01', 5, 3233, 713.8, 22.07, 'Unimed Rio'),
    (3, '2023-09-01', 10, 1444, 1415.85, 98.05, 'Unimed Floripa');

-- Insert into Revenue
INSERT INTO Revenue (company_id, value, date, operator)
VALUES
    (1, 5465, '2023-09-01', 'Unimed BH'),
    (1, 5894, '2023-08-01', 'Unimed BH'),
    (1, 4356, '2023-07-01', 'Unimed BH'),
    (2, 2222, '2023-08-01', 'Unimed Rio'),
    (2, 3233, '2023-07-01', 'Unimed Rio'),
    (3, 1444, '2023-09-01', 'Unimed Floripa');

-- Insert into Events
INSERT INTO Events (value, competence, company_id, operator, beneficiary_name, cpf, procedure_code)
VALUES
    (548.75, '2023-09-01', 1, 'Unimed BH', 'João Silva', '12345678901', 1001),
    (732.40, '2023-09-01', 1, 'Unimed BH', 'Maria Oliveira', '98765432101', 1002),
    (613.20, '2023-08-01', 1, 'Unimed BH', 'Carlos Santos', '23456789012', 1003),
    (895.15, '2023-08-01', 1, 'Unimed BH', 'Ana Pereira', '34567890123', 1004),
    (421.90, '2023-07-01', 1, 'Unimed BH', 'Fernanda Souza', '45678901234', 1005),
    (652.50, '2023-08-01', 2, 'Unimed Rio', 'Lucas Lima', '56789012345', 1006),
    (498.30, '2023-08-01', 2, 'Unimed Rio', 'Rafaela Oliveira', '67890123456', 1007),
    (713.80, '2023-07-01', 2, 'Unimed Rio', 'Mateus Silva', '78901234567', 1008),
    (589.60, '2023-09-01', 3, 'Unimed Floripa', 'Bianca Santos', '89012345678', 1009),
    (826.25, '2023-09-01', 3, 'Unimed Floripa', 'Gabriel Pereira', '90123456789', 1010);

-- Insert into Employee
INSERT INTO Employee (name, company_id, operator, cpf)
VALUES
    ('João Silva', 1, 'Unimed BH', '12345678901'),
    ('Maria Oliveira', 1, 'Unimed BH', '98765432101'),
    ('Carlos Santos', 1, 'Unimed BH', '23456789012'),
    ('Ana Pereira', 1, 'Unimed BH', '34567890123'),
    ('Fernanda Souza', 1, 'Unimed BH', '45678901234'),
    ('Lucas Lima', 2, 'Unimed Rio', '56789012345'),
    ('Rafaela Oliveira', 2, 'Unimed Rio', '67890123456'),
    ('Mateus Silva', 2, 'Unimed Rio', '78901234567'),
    ('Bianca Santos', 3, 'Unimed Floripa', '89012345678'),
    ('Gabriel Pereira', 3, 'Unimed Floripa', '90123456789');