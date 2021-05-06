const connection = require("./connection");
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const Choice = require("inquirer/lib/objects/choice");

function choices() {
    inquirer.prompt({
        message: "please Select from the Following:",
        type: "list",
        choices: ["View Employees", "View Departments", "View Roles", "Add Employee(s)", "Add Role(s)", "Add Department(s)", "Update Role(s)", "Exit"],
        name: "Choice"

    }).then(responses => {
        console.log(responses.choices);
        switch (responses.choices) {
            case "View Employees":
                viewEmployees();
                break;

            case "View Departments":
                viewDepartments();
                break;

            case "View Roles":
                viewRoles();
                break;

            case "Add Employee(s)":
                addEmployee();
                break;

            case "Add Role(s)":
                addRoles();
                break;

            case "Add Department(s)":
                addDepartment();
                break;

            case "Update Role(s)":
                updateRole();
                break;

            default:
                connection.end();
                break;
        }
    })
}

function viewEmployees() {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        console.table(results);
        choices()
    })
}

function viewDepartments() {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.table(results);
        choices();
    })
}

function viewRoles() {
    connection.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        console.table(results);
        choices()
    })
}

function addEmployee() {
    inquirer.prompt([{
        type: "input",
        name: "firstName",
        message: "Employee's first name?"
    },
    {
        type: "input",
        name: "lastName",
        message: "Employee's last name?"
    },
    {
        type: "number",
        name: "roleID",
        message: "Employee's Role ID?"
    },
    {
        type: "number",
        name: "managerID",
        message: "Employee's Manager ID?"
    }
    ]).then(function (result) {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id VALUES (?, ?, ?, ?)', [result.firsName, result.lastName, result.roleID, result.managerID], function (err, data) {
            if (err) throw err;
            console.table(data, "New employee inserted!");
            choices();
        })
    })
}

function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        Message: "Please enter the department name."
    }]).then(function (result) {
        connection.query('INSERT INTO department (name) VALUES (?)', [result.department], function (err, data) {
            if (err) throw err;
            console.table(data, "New department inserted!");
        })
    })
}

// function addRoles() {
//     inquirer.prompt([{

//     }])
// }