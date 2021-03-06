//listed dependencies
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db');
const connection = require('./db/connection');

//start application
appStart();

function appStart() {
    console.log(`
    
---------------------------------------------------------------------------------------                                                
     ________                          __                                              
    /        |                        /  |                                             
    $$$$$$$$/  _____  ____    ______  $$ |  ______   __    __   ______    ______       
    $$ |__    /     \/    \  /      \ $$ | /      \ /  |  /  | /      \  /      \      
    $$    |   $$$$$$ $$$$  |/$$$$$$  |$$ |/$$$$$$  |$$ |  $$ |/$$$$$$  |/$$$$$$  |     
    $$$$$/    $$ | $$ | $$ |$$ |  $$ |$$ |$$ |  $$ |$$ |  $$ |$$    $$ |$$    $$ |     
    $$ |_____ $$ | $$ | $$ |$$ |__$$ |$$ |$$ \__$$ |$$ \__$$ |$$$$$$$$/ $$$$$$$$/      
    $$       |$$ | $$ | $$ |$$    $$/ $$ |$$    $$/ $$    $$ |$$       |$$       |     
    $$$$$$$$/ $$/  $$/  $$/ $$$$$$$/  $$/  $$$$$$/   $$$$$$$ | $$$$$$$/  $$$$$$$/      
                            $$ |                    /  \__$$ |                         
                            $$ |                    $$    $$/                          
                            $$/                      $$$$$$/                           
     __       __                                                                       
    /  \     /  |                                                                      
    $$  \   /$$ |  ______   _______    ______    ______    ______    ______            
    $$$  \ /$$$ | /      \ /       \  /      \  /      \  /      \  /      \           
    $$$$  /$$$$ | $$$$$$  |$$$$$$$  | $$$$$$  |/$$$$$$  |/$$$$$$  |/$$$$$$  |          
    $$ $$ $$/$$ | /    $$ |$$ |  $$ | /    $$ |$$ |  $$ |$$    $$ |$$ |  $$/           
    $$ |$$$/ $$ |/$$$$$$$ |$$ |  $$ |/$$$$$$$ |$$ \__$$ |$$$$$$$$/ $$ |                
    $$ | $/  $$ |$$    $$ |$$ |  $$ |$$    $$ |$$    $$ |$$       |$$ |                
    $$/      $$/  $$$$$$$/ $$/   $$/  $$$$$$$/  $$$$$$$ | $$$$$$$/ $$/                 
                                               /  \__$$ |                              
                                               $$    $$/                               
                                                $$$$$$/                                                                    
-----------------------------------------------------------------------------------------
                                                                                          
    `)
}

//asking questions
choices();

function choices() {
    inquirer.prompt({
        message: "please Select from the Following:",
        type: "list",
        choices: ["View Employees",
            "View Departments",
            "View Roles",
            "Add Employee(s)",
            "Add Role(s)",
            "Add Department(s)",
            "Update Role(s)",
            "Delete Employee",
            "Delete Role",
            "Delete Department",
            "Exit"],
        name: "Choices"

    }).then(responses => {
        console.log(responses.Choices);
        switch (responses.Choices) {
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

            case "Delete Employee":
                deleteEmployee();
                break;

            case "Delete Role":
                deleteRole();
                break;

            case "Delete Department":
                deleteDepartment();
                break;

            default:
                connection.end();
                break;
        }
    })
}

//returning results for viewing employees
async function viewEmployees() {
    const employees = await db.findAllEmployees();
    console.table(employees);
    choices();
}

//returning results for viewing departments
async function viewDepartments() {
    const departments = await db.findAllDepartments();
    console.table(departments)
    choices()
}

//returning results for viewing roles
async function viewRoles() {
    const roles = await db.findAllRoles();
    console.table(roles);
    choices()
}

//returning results from adding employee
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
        db.addEmployee(result.firstName, result.lastName, result.roleID, result.managerID)
            .then(() => {
                console.table("employee added");
                choices()
            })
    })
}

//returning results from adding a department
function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        Message: "Please enter the department name."
    }]).then(function (result) {
        db.addDepartment(result.department)
            .then(() => {
                console.table("department added")
                choices();
            })
    })

}

//returning results from adding a role
function addRoles() {
    inquirer.prompt([{
        type: "input",
        name: "title",
        message: "Please enter title.",
    },
    {
        type: "number",
        name: "salary",
        message: "Please enter salary.",
    },
    {
        type: "number",
        name: "departmentId",
        message: "Please enter department ID.",
    }]).then(function (result) {
        db.addRole(result.title, result.salary, result.departmentId)
            .then(() => {
                console.table("role added")
                choices();
            })
        choices();
    })
}

//returning results from updating a employee role
function updateRole() {
    inquirer.prompt([{
        type: "number",
        name: "id",
        message: "Please enter the ID of the employee you would like to update.",
    },
    {
        type: "number",
        name: "role_id",
        message: "please enter role ID.",
    }]).then(function (result) {
        db.updateRole(result.id, result.role_id)
            .then(() => {
                console.table("role updated");
                choices()
            })
    })
}

//returning results from deleting an employee
function deleteEmployee() {
    inquirer.prompt([{
        type: "number",
        name: "id",
        message: "Please enter the ID of the employee you want to remove."
    }]).then(function (result) {
        db.deleteEmployee(result.id)
            .then(() => {
                console.table("employee deleted");
                choices()
            })
    })
}

//returning results from deleting a role
function deleteRole() {
    inquirer.prompt([{
        type: "number",
        name: "id",
        message: "Please enter the ID of the role you want to remove.",
    }]).then(function (result) {
        db.deleteRole(result.id)
            .then(() => {
                console.table("role deleted");
                choices();
            })
    })
}

//returning results from deleting a department
function deleteDepartment() {
    inquirer.prompt([{
        type: "number",
        name: "id",
        message: "Please enter the ID of the department you want to remove."
    }]).then(function (result) {
        db.deleteDepartment(result.id)
            .then(() => {
                console.table("department deleted");
                choices();
            })
    })
}