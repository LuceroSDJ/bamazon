// ========= The app will take in orders from customers and deplete stock from the store's inventory. ========
// ==============================  Challenge #1: Customer View   ====================================
//add code to read and set any environment variables with the dotenv package:
require("dotenv").config();
// add the code required to import my password.js file and store it in a variable.
var importedPWD = require("./password.js");  //my password was made available thanks to MODULARIZATION
// now, my password can be accessed with the following line:
var password = importedPWD.password;
console.log(password);
/*
password.js file has MySQL password which was grabbed from the process.env file. 
process.env was created by adding ENVIRONMENT SPECIFIC VARIABLES to my .env file with my actual password 
(.env file is being gitnored to keep my password private)
*/

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
// 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
    // I will use a csv file to import the data to the table 
    /* In computing, a comma-separated values file is a delimited text file that uses a comma to separate values. 
    A CSV file stores tabular data in plain text. Each line of the file is a data record. Each record consists of one or more fields, separated by commas. */


  /* 5. Then create a Node application called bamazonCustomer.js. 
  Running this application will first display all of the items available for sale. I
  nclude the ids, names, and prices of products for sale. */

