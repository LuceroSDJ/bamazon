// ========= The app will take in orders from customers and delete stock from the store's inventory. ========
// ==============================  Challenge #1: Customer View   ====================================
/*
NOTES:
password.js file contains MySQL password, which was grabbed from the process.env file. 
process.env was created by adding ENVIRONMENT SPECIFIC VARIABLES to my .env file, which contains my actual password 
(.env file is being gitnored to keep my password private)
*/
require("dotenv").config();
//console.log(process.env.MY_PASSWORD);  //process global object 
// add code to read and set any environment variables with the dotenv package:

// ===================================  TEST CODE:  =============================================================
// add code required to import my password.js file and store it in a variable.
// var importedPWD = require("./password.js");  //my password was made available thanks to MODULARIZATION
// now, my password can be accessed with the following line:
// var password = importedPWD.password;
// console.log(password);
// ==============================================================================================================

// require modules
var inquirer = require("inquirer");
var mysql      = require("mysql");

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
    A CSV file stores tabular data in plain text. Each line of the file is a data record. Each record consists of one or more fields, separated by commas. 
    tabular data: Every row has the same set of column headers
    */
     
/* 5. Then create a Node application called bamazonCustomer.js.  ✔️
Running this application will first display all of the items available for sale. 
Include the ids, names, and prices of products for sale.  ✔️ */ 

//create the connection information for the MySQL database
var connection = mysql.createConnection({
    host: "localhost",      //mysql server is connected only to my localhost
    port: 3306,             //this is mysql port that the module comes with
    user: "root",           //user should be "root" unless I changed it to something else(no creo)
    password: process.env.MY_PASSWORD,
    /* =================================== DOCUMENTATION ==================================
    The process object is global. It provides information about, and control over, 
    the current Node.js process. As a global, it is always available to Node.js applications 
    without using require().
    */
    database: "bamazon_DB" //this line indicates to which database we are connecting to
    //database must have already been created  
});
            
connection.connect(function(err) {
    if(err) throw err;  //if there are no errors, console.log the id thread ...
    console.log(`
    Connected as id: ${connection.threadId}
    Connecting to: ${connection.config.host}  
    Database Name: ${connection.config.database}
    Connection State: ${connection.state}
    `);
    //after the console.log mssg, terminal will be left hanging expecting additional code because we do not have ===== connection.end ====
    //TO EXIT: PRESS CONTROL + C OR:
    // ===== connection.end(); ====== we are running this line at the end of our .then response function 
    // =============  run showProducts() function after connection is made to prompt the user
});
                   
// bamazon is a CRUD APP. Therefore, we are Creating, Reading, Updating, and Deleting data from MySQL Database
// I have already 'created' a table ✔️
// showProducts() is reading and displaying my table data ✔️
function showProducts() {
    // query the database for all  products available for sale (Here we are connecting to mysql database)
    connection.query("SELECT * FROM `products`", function(err, results) {
        // results will contain the results of the query
        if(err) throw err;
        // once we have connected to MySQL, prompt user with available products for sale
        //console.log(results);
        console.log("☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ Welcome to Bamazon! ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★  ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★")
        for(var i = 0; i < results.length; i++){
            console.log("🛒 🆔: " + results[i].id + " | PRODUCT NAME: " + results[i].product_name + " | DEPARTMENT: " + results[i].department_name + " | 🛒 PRICE: $ " + results[i].price + " | QUANTITY: " + results[i].stock_quantity);
            console.log("〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️")
        }
    });
}
showProducts();

// again, buyProduct() is reading our table data 
// 6. The app should then prompt users with two messages.
function buyProduct() {
    // query the database for all products on sale. 
    /* Documentation: The simplest form of .query() is .query(sqlString, callback), 
    where a SQL string is the first argument and the second is a callback:  */
    connection.query("SELECT * FROM `products`", function(err, results) {
        if(err) throw err;
        // once all items are displayed, prompt user with two messages: id? / units?
        inquirer
            .prompt([
            // pass in array of objects
            {  
                //Requests product ID of item user would like to buy.
                name: "chooseID",
                type: "list",
                message: "Please select product ID to place your order:",
                filter: Number, 
                choices: ["100", new inquirer.Separator(), 
                          "101", new inquirer.Separator(), 
                          "102", new inquirer.Separator(), 
                          "103", new inquirer.Separator(), 
                          "104", new inquirer.Separator(), 
                          "105", new inquirer.Separator(), 
                          "106", new inquirer.Separator(), 
                          "107", new inquirer.Separator(), 
                          "108", new inquirer.Separator(), 
                          "109", new inquirer.Separator()
                         ]   
            },
            {
            // Request number of units.  
                name: "numUnits",
                type: "list",
                message: "How many units would you like to buy?",
                filter: Number,
                // Documentation: A separator can be added to any choices array: new inquirer.Separator() cool!
                choices: ["1", new inquirer.Separator(),
                          "2", new inquirer.Separator(), 
                          "4", new inquirer.Separator(), 
                          "8", new inquirer.Separator(), 
                          "16", new inquirer.Separator()
                         ]
            }
        ]) //prompt({}) ends
        .then(function(answers) {   //.then(answers => {...}) [ES6 syntax]
        /* 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
        If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through. */
            console.log(answers);  //answers are the USER's FEEDBACK
            for(var i = 0; i < results.length; i++) {  //results refer to the data we get from MySQL database
                if(results[i].id === answers.chooseID && results[i].stock_quantity >= answers.numUnits) {  //works as expected
                    // chooseID refers to the name property value of the promp question constructed in lines 105 to 114
                    //return results[i].product_name;  //this line cuts through the loop once it finds the selected id
                    //create a function to update stock quantity available 
                    //multiply itme's price * number of units to purchase (USER's INPUT)
                    var subtotal = results[i].price * answers.numUnits;
                    // add sales tax rate of 8.25% (multiply subtotal * tax rate)
                    var salesTax =  subtotal * 0.0825;
                    // calculate total amount
                    var total = subtotal + salesTax;
                    // console.log receipt
                    console.log(`
                        〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️
                        You purchased: ${answers.numUnits + " " + results[i].product_name + "s!"}
                        ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ 
                        Subtotal:  $ ${subtotal}
                        Sales Tax: $ ${salesTax.toFixed(2)}
                        TOTAL:     $ ${total.toFixed(2)}
                        ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ 
                        WE APPRECIATE YOUR BUSINESS!
                        〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️
                    `) 
                    // The toFixed() method converts a number into a string, keeping a specified number of decimals.
                    /* 8. However, if your store does have enough of the product, you should fulfill the customer's order.
                    This means updating the SQL database to reflect the remaining quantity.
                    Once the update goes through, show the customer the total cost of their purchase.  */
                    var balance = results[i].stock_quantity - answers.numUnits; 
                    console.log("Remaining number of " + results[i].product_name + "s in stock : " + balance);
                    // HERE WE NEED TO CONNECT TO MYSQL TO UPDATE THE DATA IN MYSQL DATABASE
                    connection.query(
                        "UPDATE `products` SET stock_quantity = ? WHERE id = ?", [balance, results[i].id],
                        function(error) {
                            if (error) throw error;
                            console.log("Stock quantity has been UPDATED!");
                            //delete row with zero stock quantity
                            // DELETE statement
                            connection.query("DELETE FROM `products` WHERE `stock_quantity` = ?", 0);
                            connection.end();
                        }         
                    ); // connection. query ends  
                }
                // AS I CONTINUE LOOPING THROUGH MYSQL DATA & I DO NOT HAVE ENOUGH ITEMS IN MY INVENTORY:
                else if(results[i].id === answers.chooseID && results[i].stock_quantity < answers.numUnits) {
                    console.log("Not enough items in stock! We apologize for the inconvenience.");
                    inquirer
                        .prompt({
                            type: "confirm", 
                            name: "buyAgain",
                            message: "Would you like to decrease the quantity of items?"
                        })
                        .then(function(answers) {
                            if(answers.buyAgain) {
                                //call buyAgain() function
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

//call main function buyProduct()
buyProduct();

function buyAgain() {
    console.log("☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ Welcome back to Bamazon! ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★")
    buyProduct();
};