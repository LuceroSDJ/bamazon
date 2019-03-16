# bamazon
Bamazon is an Amazon-like storefront displayed through the Terminal using node.js and MySQL (Structured Query Language ). It is a CRUD application which uses the basic functions of persistent storage:
* Create 
* Read
* Update
* Delete

## GOAL
Bamazon's goal is to facilitate viewing, searching, and changing information from MySQL Database and to provide an excellent shopping experience.

### TECHNOLOGIES
* JavaScript
* node.js
* MySQL

### MODULES
* dotenv
* inquirer
* MySQL

### FUNCTIONALITY
#### 1. `Create MySQL Bamazon Database & 'products' table`
  * [Demo Video: Create Table](https://drive.google.com/file/d/1PLUc1YmuqyeAb0joCqTPJiC-gHHTWIjG/view)
  * 'products' table was populated with 10 different products containing the item id, name, department, price, and stock quantity.
  * The items were imported from an external CSV (comma-separated values) file into MySQL Workbench
  ![importCSVfile](https://user-images.githubusercontent.com/44692872/54465537-a486e780-4749-11e9-9b70-0f95abc86809.png)

#### 2. `Read MySQL data by running bamazonCustomer.js.`
  * [Demo Video: 'Not enough items in stock'](https://drive.google.com/file/d/17rEM1cI0QPSIEhYrEpsRtEVOk-Nbe1hQ/view)
  * This application will first display a table containing all of the items available for sale.
  * Then, it will pormpt user with two messages:
  ```
    * The first one asks the item_id of the product the user wants to buy.
    * The second one asks how many units of the product the user wants to buy.
  ```    
  * Once the customer has placed the order, the application checks if the store has enough of the products to meet customer's request.
  ```
    * If not, the app logs the phrase 'Not enough items in stock', and then prevent the order from going through.
        * Then, it asks customers to confirm (Y/N) if they would like to decrease the quantity requested.
            * If confirmed 'yes', then customer is prompted with the same two initial messages.
            * If confirmed 'no', then connection ends.
  ```
  ![displayMySqlData](https://user-images.githubusercontent.com/44692872/54465947-a356ba00-474b-11e9-953d-c4ca323436ea.png)
  ![mssgsNnotEnough](https://user-images.githubusercontent.com/44692872/54470532-4b35ad00-4777-11e9-8c44-aff8d6fa87a5.png)

#### 3. `Update MySQL database to reflect the ramaining quantity`
  * [Demo Video: 'Stock quantity has been UPDATED!'](https://drive.google.com/file/d/1tikrxAC-yLgcIelsRCorFzqBuc6ciW2g/view)
  * If Bamazon has enough of the product, the app places the order.
  ```
    * A receipt is displayed including item's name, price, sales tax, and total amount.
    * MySQL database gets automatically updated decreasing the ramaining quantity in stock.
  ```
  * In this example, we are purchasing 2 out of 10 Floral Print Summer Skirts, and the remaining balance of skirts is 8 (10 -2 = 8).
  ![updatedTerminal](https://user-images.githubusercontent.com/44692872/54471166-ade07600-4782-11e9-8634-4e08f2b5e129.png)
  ![updatedRow](https://user-images.githubusercontent.com/44692872/54471191-247d7380-4783-11e9-9f28-2e0080fc852d.png)
  ![updatedMySQL](https://user-images.githubusercontent.com/44692872/54471210-8938ce00-4783-11e9-9fbd-70e8228d49a5.png)

#### 4. `Delete out-of-stock products`
  * [Demo Video: Delete Out-of-Stock Product](https://drive.google.com/file/d/1HJ7ZBa9E2an2mqDnQdAj11VZR7CFl_j4/view)
  * After an order is placed, the app checks if the product is out-of-stock.
  ```
    * If 'stock_quantity' is zero, the product's information is deleted.
    * This change is reflected in MySQL database.
  ```
  * In this example, we are buying 8 out of 8 Floral Print Summer Skirts, and the remaining balance of skirts is zero (8 - 8 = 0).
  ![zeroBalanceTerminal](https://user-images.githubusercontent.com/44692872/54471507-0c5c2300-4788-11e9-92ac-b95aa8e7ccf7.png)
  ![deletedMySQLdata](https://user-images.githubusercontent.com/44692872/54471541-ab811a80-4788-11e9-978c-d1652720dbd2.png)

