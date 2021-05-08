const connection = require("./connection");
const mysql = require('mysql');

class Database {
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM employee', (err, results) => {
                if (err) reject(err);
                resolve(results);
            })
        })
    }

    findAllDepartments() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM department', (err, results) => {
                if (err) reject(err);
                resolve(results);
            })
        })
    }

    findAllRoles() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM role', (err, results) => {
                if (err) reject(err);
                resolve(results);
            })
        })
    }

    addEmployee(firstName, lastName, roleID, managerID) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleID, managerID], function (err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
    }


    addDepartment(department) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO department (name) VALUES (?)', [department], function (err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    addRole(title, salary, departmentId) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId], function (err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

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
    deleteEmployee(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM employee where id = ?', [id], function (err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

}

module.exports = new Database(connection);