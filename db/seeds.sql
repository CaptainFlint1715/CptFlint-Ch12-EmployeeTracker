INSERT INTO department (id, name)
VALUES (1, 'Sales'), (2, 'Marketing'), (3, 'Engineering');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Sales Manager', 60000, 1), (2, 'Sales Representative', 40000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Jim', 'Clarke', 1, NULL), (2, 'Gary', 'Smuthers', 2, 1);