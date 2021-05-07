const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db');
const connection = require('./db/connection');

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

choices();

function choices() {
    inquirer.prompt({
        message: "please Select from the Following:",
        type: "list",
        choices: ["View Employees", "View Departments", "View Roles", "Add Employee(s)", "Add Role(s)", "Add Department(s)", "Update Role(s)", "Exit"],
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

            default:
                connection.end();
                break;
        }
    })
}

async function viewEmployees() {
    const employees = await db.findAllEmployees();
    console.table(employees);
    choices();
}

async function viewDepartments() {
    const departments = await db.findAllDepartments();
    console.table(departments)
    choices()
}


async function viewRoles() {
    const roles = await db.findAllRoles();
    console.table(roles);
    choices()
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
        db.addEmployee(result.firstName, result.lastName, result.roleID, result.managerID)
            .then(() => {
                console.table("employee added");
                choices()
            })
    })
}

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

