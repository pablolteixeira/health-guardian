USE mysql;

INSERT INTO Sinister_formula (formula)
VALUES
    ('S=s/f'),
    ('S=s-f/f');

INSERT INTO Companies (name, operator, broker, cod_sinister)
VALUES
    ('Fettrominas', 'Unimed BH', 'GNDI', 1),
    ('Afu', 'Unimed Rio', 'GNDI', 1),
    ('Acate', 'Unimed Floripa', 'GNDI', 1);

INSERT INTO Validators (company_id, competence, lives, revenue, sinister, accident_rate)
VALUES
    (1, '2023-09-01', 10, 5465, 1281.15, 23.44),
    (1, '2023-08-01', 8, 5894, 1508.35, 25.59),
    (1, '2023-07-01', 5, 4356, 421.90, 9.68),
    (2, '2023-08-01', 8, 2222, 1150.8, 51.79),
    (2, '2023-07-01', 5, 3233, 713.8, 22.07),
    (3, '2023-09-01', 10, 1444, 1415.85, 98.05);

INSERT INTO Revenues (company_id, value, data)
VALUES
    (1, 5465, '2023-09-01'),
    (1, 5894, '2023-08-01'),
    (1, 4356, '2023-07-01'),
    (2, 2222, '2023-08-01'),
    (2, 3233, '2023-07-01'),
    (3, 1444, '2023-09-01');

INSERT INTO Collaborators (name, company_id, cpf)
VALUES
    ( 'João Silva', 1, '12345678901'),
    ( 'Maria Oliveira', 1, '98765432101'),
    ( 'Carlos Santos', 1, '23456789012'),
    ( 'Ana Pereira', 1, '34567890123'),
    ( 'Fernanda Souza', 1, '45678901234'),
    ( 'Lucas Lima', 2, '56789012345'),
    ( 'Rafaela Oliveira', 2, '67890123456'),
    ( 'Mateus Silva', 2, '78901234567'),
    ( 'Bianca Santos', 3, '89012345678'),
    ( 'Gabriel Pereira', 3, '90123456789');

INSERT INTO Appointments (value, competence, company_id, collaborator_id, cod_procedure)
VALUES
    (548.75, '2023-09-01', 1, 1, 1001),
    (732.40, '2023-09-01', 1, 2, 1002),
    (613.20, '2023-08-01', 1, 3, 1003),
    (895.15, '2023-08-01', 1, 4, 1004),
    (421.90, '2023-07-01', 1, 5, 1005),
    (652.50, '2023-08-01', 2, 6, 1006),
    (498.30, '2023-08-01', 2, 7, 1007),
    (713.80, '2023-07-01', 2, 8, 1008),
    (589.60, '2023-09-01', 3, 9, 1009),
    (826.25, '2023-09-01', 3, 10, 1010);
