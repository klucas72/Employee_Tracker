//required dependencies
const connection = require("./connection");
const mysql = require('mysql');

//constructor class for database queries
class Database {
    constructor(connection) {
        this.connection = connection;
    }
    // query for listing all employees
    findAllEmployees() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM employee', (err, results) => {
                if (err) reject(err);
                resolve(results);
            })
        })
    }
    // query for listing all departments
    findAllDepartments() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM department', (err, results) => {
                if (err) reject(err);
                resolve(results);
            })
        })
    }
    // query for listing all roles
    findAllRoles() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM role', (err, results) => {
                if (err) reject(err);
                resolve(results);
            })
        })
    }
    // query for adding an employee
    addEmployee(firstName, lastName, roleID, managerID) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleID, managerID], function (err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    //query for adding a department
    addDepartment(department) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO department (name) VALUES (?)', [department], function (err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    //query for adding a role
    addRole(title, salary, departmentId) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId], function (err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    //query for updating a role
    updateRole(id, role_id) {
        console.log(role_id);
        console.log(id);
        return new Promise((resolve, reject) => {
            connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [role_id, id], function (err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    //query for deleting an employee
    deleteEmployee(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM employee where id = ?', [id], function (err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    //query for deleting a role
    deleteRole(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM role where id = ?', [id], function (err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    //query for deleting a department
    deleteDepartment(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM department where id = ?', [id], function (err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

}

module.exports = new Database(connection);