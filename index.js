//import mysql2
const mysql = require('mysql2');
//import inquirer
const inquirer = require('inquirer');
//import figlet for box lettering
var figlet = require('figlet');
// import console.table
const { clear } = require('console');

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


  //Inquirer to prompt User
  const start = () => {
    inquirer
      .prompt({
        name: "chooseAction",
        type: "list",
        message:
          "Would you like to [VIEW], [ADD], or [UPDATE] a departments, roles, or employees?",
        choices: ["VIEW", "ADD", "UPDATE", "END"],
      })
      .then((response) => {

        //View Selection
        if(response.chooseAction === "VIEW") {
          inquirer
            .prompt({
              name: "chooseView",
              title: "list",
              message: "What would you like to view?",
              choices: ["Departments", "Roles", "Employees"],
            })
            .then((response) => {
              //View Departments
              if(response.chooseView === "departments") {
                connection.query("SELECT * FROM departments", (err, res) => {
                  if (err) throw err;
                  console.table(res);
                  start()
                });
              }

              //View Roles
              if(response.chooseView === "roles") {
                connection.query("SELECT * FROM roles", (err, res) => {
                  if (err) throw err;
                  console.table(res);
                  start()
                });
              }

              //View Employees
              if(response.chooseView === "employees") {
                connection.query("SELECT * FROM employees", (err, res) => {
                  if (err) throw err;
                  console.table(res);
                  start()
                })
              }

            })
        }
      })
  }


  connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
