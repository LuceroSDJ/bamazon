// ========= The app will take in orders from customers and deplete stock from the store's inventory. ========
// ==============================  Challenge #1: Customer View   ====================================


/* ===================================  TEST CODE:  =============================================================
//add code to read and set any environment variables with the dotenv package:
require("dotenv").config();
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
        fs.readFile(".env", "utf8", function(err, data) {
          if(err) {
            return console.log(err);
          }
          var data = data.split("=");
          //var commandArg = data[0];
          var songArg = data[1];
          console.log(songArg);
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
    password: 'Exito2019*',
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
    connection.end();
    //after the console.log mssg, terminal will be left hanging expecting additional code because we do not have ===== connection.end ====
    //TO EXIT: PRESS CONTROL + C OR:
    // ===== connection.end(); ====== we are running this line at the end of our .then response function 
    // =============  run start function after the connection is made to prompt the user
    // ============== start();
});
                   

function showProducts() {
    // query the database for all  products available for sale. Here we are connecting to mysql table
    connection.query('SELECT * FROM products', function(err, results) {
        if(err) throw err;
        // once we have connected to MySQL, prompt user with available products for sale
        console.log(results);
    });
}
showProducts();

// 6. The app should then prompt users with two messages.
function productID() {
    //query the database for all products on sale. 
    connection.query('SELECT * FROM products', function(err, results) {
        if(err) throw err;
        // once I have all items, prompt user with the available product id's
        inquirer
            .prompt([
            {
                // The first should ask them the ID of the product they would like to buy.
                name: 'chooseID',
                type: 'input',
                //type: 'rawlist',
                message: 'To place your order, select the product\'s id:',
                /*
                choices: function() {
                    var choices = [];
                    //loop through the results
                    for(var i = 0; i < results.length; i++) {
                        //push results[i].item_id into choices[]
                        choices.push(results[i].stock_quantity);
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
                choices: ['1','2','3','4','5']
            }
        ]) //prompt({}) ends
        .then(function(answers) {
            console.log(answers);
        }) //.then(){} ends
    }); //connection.query({}) ends
};  //productID() ends
productID();









