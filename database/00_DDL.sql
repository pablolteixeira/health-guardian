USE mysql;

/*
-- Claim Formula Table
CREATE TABLE Claim_Formula (
    id INT AUTO_INCREMENT PRIMARY KEY,
    formula VARCHAR(255)
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
    FOREIGN KEY (company_id) REFERENCES Company (id),
    -- Removi a referência à coluna 'operator' na tabela Company, porque não fazia sentido nesse contexto.
    INDEX fk_validator_company (company_id),
    CONSTRAINT fk_validator_company
    FOREIGN KEY (company_id) 
    REFERENCES Company (id)
);

-- Revenue Table
CREATE TABLE Revenue (
    company_id INT,
    value DECIMAL(10, 2),
    date DATE,
    operator VARCHAR(255),
    FOREIGN KEY (company_id) REFERENCES Company (id),
    INDEX fk_revenue_company (company_id),
    CONSTRAINT fk_revenue_company
    FOREIGN KEY (company_id) 
    REFERENCES Company (id)
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
    FOREIGN KEY (company_id) REFERENCES Company (id),
    INDEX fk_events_company (company_id),
    CONSTRAINT fk_events_company
    FOREIGN KEY (company_id) 
    REFERENCES Company (id)
);

-- Employee Table
CREATE TABLE Employee (
    name VARCHAR(255),
    company_id INT,
    operator VARCHAR(255),
    cpf VARCHAR(11),
    FOREIGN KEY (company_id) REFERENCES Company (id),
    INDEX fk_employee_company (company_id),
    CONSTRAINT fk_employee_company
    FOREIGN KEY (company_id) 
    REFERENCES Company (id)
);
*/

-- Users Table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    registration_date DATE NOT NULL
);

-- Products Table
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Orders Table
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT NOT NULL,
    order_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (user_id),
    FOREIGN KEY (product_id) REFERENCES Products (product_id)
);

-- Insert some sample data
INSERT INTO Users (username, email, registration_date) VALUES
('JohnDoe', 'john@example.com', '2023-01-01'),
('JaneSmith', 'jane@example.com', '2023-01-02');

INSERT INTO Products (product_name, price) VALUES
('ProductA', 19.99),
('ProductB', 29.99);

INSERT INTO Orders (user_id, product_id, quantity, order_date) VALUES
(1, 1, 2, '2023-01-10'),
(2, 2, 1, '2023-01-15');