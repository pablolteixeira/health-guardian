-- Validator Table
CREATE TABLE Validator (
id INT AUTO_INCREMENT PRIMARY KEY,
company_id INT,
competence DATE,
lives INT,
revenue DECIMAL(10, 2),
claim DECIMAL(10, 2),
loss_ratio DECIMAL(5, 2),
operator VARCHAR(255),
FOREIGN KEY (company_id, operator) REFERENCES Company (id, operator)
);

-- Company Table
CREATE TABLE Company (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255),
operator VARCHAR(255),
broker VARCHAR(255),
claim_code INT,
FOREIGN KEY (claim_code) REFERENCES Claim_Formula (id)
);

-- Revenue Table
CREATE TABLE Revenue (
company_id INT,
value DECIMAL(10, 2),
date DATE,
operator VARCHAR(255),
FOREIGN KEY (company_id, operator) REFERENCES Company (id, operator)
);

-- Events Table
CREATE TABLE Events (
value DECIMAL(10, 2),
competence DATE,
company_id INT,
operator VARCHAR(255),
beneficiary_name VARCHAR(255),
cpf VARCHAR(11),
procedure_code INT,
FOREIGN KEY (company_id, operator) REFERENCES Company (id, operator)
);

-- Employee Table
CREATE TABLE Employee (
name VARCHAR(255),
company_id INT,
operator VARCHAR(255),
cpf VARCHAR(11),
FOREIGN KEY (company_id, operator) REFERENCES Company (id, operator)
);

-- Claim Formula Table
CREATE TABLE Claim_Formula (
id INT AUTO_INCREMENT PRIMARY KEY,
formula VARCHAR(255)
);