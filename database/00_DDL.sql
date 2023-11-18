USE mysql;

-- Tabela Sinister_formula
CREATE TABLE Sinister_formula (
    id INT AUTO_INCREMENT PRIMARY KEY,
    formula VARCHAR(255)
);

-- Tabela Company
CREATE TABLE Companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    operator VARCHAR(255),
    broker VARCHAR(255),
    cod_sinister INT,
    FOREIGN KEY (cod_sinister) REFERENCES Sinister_formula (id)
);

-- Tabela Validador
CREATE TABLE Validators (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    competence DATE,
    lives INT,
    revenue DECIMAL(10, 2),
    sinister DECIMAL(10, 2),
    accident_rate DECIMAL(5, 2),
    FOREIGN KEY (company_id) REFERENCES Companies (id)
);

-- Tabela revenue
CREATE TABLE Revenues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    value DECIMAL(10, 2),
    data DATE,
    FOREIGN KEY (company_id) REFERENCES Companies (id)
);

-- Tabela Eventos
CREATE TABLE Appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value DECIMAL(10, 2),
    competence DATE,
    company_id INT,
    name_benef VARCHAR(255),
    cpf VARCHAR(11),
    cod_procedure INT,
    FOREIGN KEY (company_id) REFERENCES Companies (id)
);

-- Tabela Colaborador
CREATE TABLE Collaborators (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    company_id INT,
    cpf VARCHAR(11),
    FOREIGN KEY (company_id) REFERENCES Companies (id)
);