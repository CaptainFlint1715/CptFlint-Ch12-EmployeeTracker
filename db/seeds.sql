INSERT INTO departments (name)
VALUES ('Sales'), ('Marketing'), ('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Manager', 60000, 1), ('Sales Representative', 40000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Jim', 'Clarke', 1, NULL), ('Gary', 'Smuthers', 2, 1);