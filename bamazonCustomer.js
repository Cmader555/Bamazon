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
  //console.log("connected as id " + connection.threadId + "\n");

  runSearch();
});


function runSearch() {

  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Buy a product!",
        "exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Buy a product!":
          display();
          purchase();
          break;


        case "exit":
          connection.end();
          break;
      }
    });
}



function display() {

  connection.query("SELECT id,product_Name, department_name, price, stock_quantity FROM bamazon_db.products", function (err, data) {
    if (err) throw err;
    console.table(data);

  });
};


function purchase() {


  connection.query("SELECT * FROM products", function (err, data) {
    if (err) throw err;
    //console.log(data[5-1].stock_quantity)

    inquirer.prompt([
      {
        name: "id",
        type: "input",
        message: "What is the id of the item you want to purchase?"
      },
      {
        name: "quantity",
        type: "input",
        message: "What is the quantity of the item that you want? "
      },
    ]).then(function (answer) {

      let sales = parseInt(answer.quantity) * parseInt(data[answer.id-1].price); 

      if ((data[answer.id - 1].stock_quantity - answer.quantity) > 0) {

        //console.log((data[answer.id - 1].stock_quantity - answer.quantity))
        connection.query(`UPDATE products SET stock_quantity = ${(data[answer.id - 1].stock_quantity - answer.quantity)} WHERE id = ${answer.id};`, function (err) {
          if (err) throw err;
          
          

        });

        connection.query(`UPDATE products SET product_sales = ${sales + data[answer.id-1].product_sales} WHERE id = ${answer.id}`, function(err){
          
          if (err) throw err;
          console.log(chalk.black.bgGreen(`Your total purchase cost is: ${sales} dollars!`)); 
          runSearch();

        }); 

      } else {

        console.log("Sorry we don't have enough of that item in stock to complete the order! Please try again!");
        //display();
        runSearch();
      }

    });


  });
};




