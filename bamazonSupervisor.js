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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    menu(); 

});

function menu() {

    inquirer.prompt({
        name: "menu",
        type: "list",
        message: "What do you need to supervise",
        choices: [
            "View Product Sales by Department",
            "Create New Department",
            "exit"

        ]



    }).then(function (response) {


        if (response.menu === "View Product Sales by Department") {

            //productSales();

          } else if (response.menu === "exit") {
      
            connection.end();
          }



    });

}; 
