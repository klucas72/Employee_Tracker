use employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Sales person', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Ashley', 2, 1),
    ('Ashley', 'Dunlap', 3, NULL),
    ('Kevin', 'Hartenberger', 4, 3),
    ('Kunal', 'Prital', 5, NULL),
    ('Jamie', 'Brown', 6, 5),
    ('Sarah', 'Bettencourt', 7, NULL),
    ('Tom', 'Lucas', 8, 7);