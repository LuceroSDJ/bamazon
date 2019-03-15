// ========= The app will take in orders from customers and deplete stock from the store's inventory. ========
// ==============================  Challenge #1: Customer View   ====================================


require("dotenv").config();
console.log(process.env.MY_PASSWORD);  //process global object 
/* ===================================  TEST CODE:  =============================================================
//add code to read and set any environment variables with the dotenv package:
// add the code required to import my password.js file and store it in a variable.
var importedPWD = require("./password.js");  //my password was made available thanks to MODULARIZATION
// now, my password can be accessed with the following line:
var password = importedPWD.password;
console.log(password);
NOTES:
password.js file has MySQL password which was grabbed from the process.env file. 
process.env was created by adding ENVIRONMENT SPECIFIC VARIABLES to my .env file with my actual password 
(.env file is being gitnored to keep my password private)


/* ===================================  TEST CODE:  =============================================================
var fs = require("fs");

function randomCommand() {
        fs.readFile(".env", "utf8", function(err, data) { //not this file
          if(err) {
            return console.log(err);
          }
          console.log(data.split("=")[1]);
        })
};
randomCommand(); 
=============================================================================================================== */

// require modules
var inquirer = require('inquirer');
var mysql      = require('mysql');

// 1. Create a MySQL Database called bamazon. ✔️
// 2. Then create a Table inside of that database called products. ✔️
/* 3. The products table should have each of the following columns: ✔️
    item_id (unique id for each product)
    product_name (Name of product)
    department_name
    price (cost to customer)
    stock_quantity (how much of the product is available in stores) */
// 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table). ✔️
    // I will use a csv file to import the data to the table 
    /* In computing, a comma-separated values file is a delimited text file that uses a comma to separate values. 
    A CSV file stores tabular data in plain text. Each line of the file is a data record. Each record consists of one or more fields, separated by commas. */
      
/* 5. Then create a Node application called bamazonCustomer.js.  ✔️
Running this application will first display all of the items available for sale. 
Include the ids, names, and prices of products for sale.  ✔️ */ 

//create the connection information for the MySQL database
var connection = mysql.createConnection({
    host: 'localhost',      //mysql server is connected only to my localhost
    port: 3306,             //this is mysql port that the module comes with
    user: 'root',           //user should be 'root' unless I changed it to something else(no creo)
    password: process.env.MY_PASSWORD,
    database: 'bamazon_DB' //this line indicates to which database we are connecting to (must have already been created)  
});
            
connection.connect(function(err) {
    if(err) throw err;  //if there are no errors, console.log the id thread ...
    console.log(`
    Connected as id: ${connection.threadId}
    Connecting to: ${connection.config.host}  
    Database Name: ${connection.config.database}
    Connection State: ${connection.state}
    `);
   // connection.end();
    //after the console.log mssg, terminal will be left hanging expecting additional code because we do not have ===== connection.end ====
    //TO EXIT: PRESS CONTROL + C OR:
    // ===== connection.end(); ====== we are running this line at the end of our .then response function 
    // =============  run start function after the connection is made to prompt the user
    // ============== start();
});
                   
// this should be a CRUD APP 
// I have already 'created' a table
// showProducts() is reading and displaying my table data
function showProducts() {
    // query the database for all  products available for sale. Here we are connecting to mysql table
    connection.query('SELECT * FROM products', function(err, results) {
        if(err) throw err;
        // once we have connected to MySQL, prompt user with available products for sale
        //console.log(results);
        console.log('☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ Welcome to Bamazon! ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★  ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★')
        for(var i = 0; i < results.length; i++){
            console.log("🛒 🆔: " + results[i].id + " | PRODUCT NAME: " + results[i].product_name + " | DEPARTMENT: " + results[i].department_name + " | 🛒 PRICE: $ " + results[i].price + " | QUANTITY: " + results[i].stock_quantity);
            console.log('〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️')
        }
    });
}
showProducts();



// again, productID() is reading our table data (id) if question type: list
// 6. The app should then prompt users with two messages.
function buyProduct() {
    //query the database for all products on sale. 
    /* The simplest form of .query() is .query(sqlString, callback), 
    where a SQL string is the first argument and the second is a callback:  */
    connection.query('SELECT * FROM products', function(err, results) {
        if(err) throw err;
        // once I have all items, prompt user with the available product id's
        inquirer
            .prompt([
            {
                // The first should ask them the ID of the product they would like to buy.
                name: 'chooseID',
                type: 'input',
                //type: 'list',
                message: 'To place your order, select the product\'s id:',
                filter: Number, 
                default: 'Please enter a valid ID number',  
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
                /*
                choices: function() {
                    var choices = [];
                    //loop through the results
                    for(var i = 0; i < results.length; i++) {
                        //push results[i].id into choices[]
                        choices.push(results[i].id);
                    }
                    return choices;
                } //choices function(){} ends
                */
            },
            {
            // The second message should ask how many units of the product they would like to buy.  
                name: 'numUnits',
                type: 'list',
                message: 'How many usnits would you like to buy?',
                // A separator can be added to any choices array: new inquirer.Separator()
                choices: ['1', new inquirer.Separator(),'2', new inquirer.Separator(), '4', new inquirer.Separator(), '8', new inquirer.Separator(), '16', new inquirer.Separator()],
                filter: Number
            }
        ]) //prompt({}) ends
        .then(function(answers) {
        /* 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
        If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through. */
            console.log(answers);  //works as expected
            for(var i = 0; i < results.length; i++) {
                if(results[i].id === answers.chooseID && results[i].stock_quantity >= answers.numUnits) {  //works as expected
                    //return results[i].product_name;  //this line cuts through the loop once it finds the selected id
                    //create a function to update stock quantity available 
                    var subtotal = results[i].price * answers.numUnits;
                    
                    // HERE WE NEED TO CONNECT TO MYSQL 
                    connection.query(
                        'UPDATE products SET ? WHERE ?',
                        [
                            {
                                stock_quantity: balance 
                            },
                            {
                                id: results[i].id
                            }
                        ],
                        function(error) {
                            if (error) throw err;
                            console.log('Stock quantity has been UPDATED!');
                            connection.end();
                            
                        }
                    ); // connection. query ends  

                }
                else if(results[i].id === answers.chooseID && results[i].stock_quantity <= answers.numUnits) {
                    console.log('Not enough items in stock.');
                    inquirer
                        .prompt({
                            type: 'confirm', 
                            name: 'buyAgain',
                            message: 'Would you like to decrease the quantity of items?'
                        })
                        .then(function(answers) {
                            if(answers.buyAgain) {
                                //console.log('buy again');
                                buyAgain();   
                            }
                            else {
                                connection.end();
                            }
                        }) //.then ends
                }  //else if closes
            } //for loop closes

        }) //.then(){} ends
    }); //connection.query({}) ends
};  //productID() ends
buyProduct();
// ======= test code 


/* 8. However, if your store does have enough of the product, you should fulfill the customer's order.
This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.  */

function buyAgain() {
   
    buyProduct();
}




