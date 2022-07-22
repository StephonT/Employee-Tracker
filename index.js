const mysql = require('mysql2');
const express = require('express');

//code that will connect the application to the MySQL database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',

      // Your MySQL password
      password: 'LeahBean2020!',

      //desired database
      database: 'employee_db'
    },
    console.log('Connected to the election database.')
  );