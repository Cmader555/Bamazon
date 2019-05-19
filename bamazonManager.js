require("console.table")
const inquirer = require("inquirer")
const mysql = require("mysql");
const chalk = require('chalk');

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
  // run the menu function after the connection is made to prompt the user
  menu()
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
      "Add New Product",
      "exit"

    ]



  }).then(function (response) {

    if (response.menu === "View Products For Sale") {

      displayProducts();


    } else if (response.menu === "View Low Inventory") {

      lowInventory();


    } else if (response.menu === "Add To Inventory"){

      addInventory(); 
      
    } else if (response.menu === "exit") {

      connection.end();
    }

  })
};




function displayProducts() {

  connection.query("SELECT * FROM products", function (err, data) {
    if (err) throw err;
    console.table(data);
    menu();

  });
};


function lowInventory() {

  connection.query("SELECT * FROM bamazon_db.products WHERE stock_quantity <=5", function (err, data) {
    if (err) throw err;

    if (data.stock_quantity === undefined) {
      console.log(chalk.black.bgGreen("There are no items that are low in Inventory! "));
      menu();
    } else {
      console.table(data);
      menu();
    }

  })
};


function addInventory() {

  inquirer.prompt([

    {
      name: "id",
      type: "input",
      message: "What is the id of the item you want to add stock to?"
    },
    {
      name: "quantity",
      type: "input",
      message: "How much stock do you want to add to this inventory slot?"
    }

  ]).then(function (answer) {

    connection.query(`UPDATE products SET stock_quantity =${data[answer.id-1].stock_quantity + answer.quantity} WHERE id =${answer.id}`, function(err){

      if (err) throw err;

      connection.query(`SELECT * FROM products WHERE id=${answer.id}`, function(err,data){

        console.table(chalk.black.bgGreen(data));
        menu();   
      }); 

    })

  })



}; 