CREATE DATABASE bamazon_DB;
USE bamazon_DB;

-- AUTO_INCREMENT increments the value each time a new row is added and the value persists to the table --

-- How to reset MySQL autoincrement column --
-- To start with an AUTO_INCREMENT value other than 1, --
-- set that value with CREATE TABLE or ALTER TABLE, like this: --
-- mysql> ALTER TABLE tbl AUTO_INCREMENT = 100; --
-- RUN THIS LINE OF CODE BEFORE IMPORTING INVENTORY DATA --
alter TABLE products AUTO_INCREMENT = 100;

CREATE TABLE products (
	-- item_id (unique id for each product) --
	id INT NOT NULL AUTO_INCREMENT,
    -- product_name (Name of product) --
    product_name VARCHAR(100) NOT NULL,
	-- department_name --
    department_name VARCHAR(50) NOT NULL,
	-- price (cost to customer) --
	price DECIMAL(5,2) NOT NULL,
	-- stock_quantity (how much of the product is available in stores) --
    stock_quantity INT default 10,
	PRIMARY KEY (id)
);

-- Show all data in a table --
SELECT * FROM products;

-- test --
DROP TABLE products;

-- test: delete all test data in the table --
TRUNCATE TABLE products;
