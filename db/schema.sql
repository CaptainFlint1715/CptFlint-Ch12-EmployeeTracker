DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(30) NOT NULL,
);

CREATE TABLE roles (
  id INT PRIMARY KEY NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
);

CREATE TABLE employees (
  id INT PRIMARY KEY NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
);
