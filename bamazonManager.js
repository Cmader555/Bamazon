require("console.table")
const inquirer = require("inquirer")
const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    
  });


  function menu() {

    inquirer.prompt({
        name: "menu", 
        type: "list", 
        message: "What do you need to manage?", 
        choices: [
            "View Products For Sale", 
            "View Low Inventory", 
            "Add To Inventory", 
            "Add New Product"

        ]



    }); 
  }; 