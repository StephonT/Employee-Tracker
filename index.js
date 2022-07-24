//import mysql2
const mysql = require('mysql2');
//import inquirer
const inquirer = require('inquirer');
//import figlet for box lettering
var figlet = require('figlet');
// import console.table
const { clear } = require('console');
const { response } = require('express');

//add box lettering
figlet("Employee \n Manager!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.log(err);
    return;
  }
  console.log(data);
});


//code that will connect the application to the MySQL database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      //MySQL username,
      user: 'root',

      //MySQL password
      password: "LeahBean2020!",

      //desired database
      database: 'employee_db'
    },
    console.log('Connected to the employee database.')
  );
  //End of MySQL connection


 // inquirer prompt for first action
const promptUser = () => {
  inquirer.prompt ([
    {
      type: 'list',
      name: 'choices', 
      message: 'What would you like to do?',
      choices: ['View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role',
                'Update an employee manager',
                "View employees by department",
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'View department budgets',
                'No Action']
    }
  ])
    .then((answers) => {
      const { choices } = answers; 

      if (choices === "View all departments") {
        showDepartments();
      }

      if (choices === "View all roles") {
        showRoles();
      }

      if (choices === "View all employees") {
        showEmployees();
      }

      if (choices === "Add a department") {
        addDepartment();
      }

      if (choices === "Add a role") {
        addRole();
      }

      if (choices === "Add an employee") {
        addEmployee();
      }

      if (choices === "Update an employee role") {
        updateEmployee();
      }

      if (choices === "Update an employee manager") {
        updateManager();
      }

      if (choices === "View employees by department") {
        employeeDepartment();
      }

      if (choices === "Delete a department") {
        deleteDepartment();
      }

      if (choices === "Delete a role") {
        deleteRole();
      }

      if (choices === "Delete an employee") {
        deleteEmployee();
      }

      if (choices === "View department budgets") {
        viewBudget();
      }

      if (choices === "No Action") {
        connection.end()
    };
  });
};


//FUNCTIONS


// function to show all departments 
showDepartments = () => {
  console.log('Showing all departments...\n');
  const sql = `SELECT department.id AS id, department.name AS department FROM department`; 

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

// function to show all roles 
showRoles = () => {
  console.log('Showing all roles...\n');

  const sql = `SELECT role.id, role.title, department.name AS department
               FROM role
               INNER JOIN department ON role.department_id = department.id`;
  
  connection.query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows); 
    promptUser();
  })
};


  
  
  connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    promptUser();
  });
