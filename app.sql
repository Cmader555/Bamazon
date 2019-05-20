CREATE DATABASE bamazon_db; 

USE bamazon_db; 

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_Name VARCHAR(100) NOT NULL, 
    department_name VARCHAR(100), 
    price DECIMAL(10, 2), 
    stock_quantity INTEGER(10), 
    PRIMARY KEY (id)
); 


INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("ECHO Dot", "Electronics", 39.99, 100);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Kindle", "Electronics", 89.99, 50);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Soccer Ball", "Sports", 15.99, 35);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Tooth Brush", "Toiletries", 04.99, 300);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Xbox", "Electronics", 329.99, 20);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Pillow", "Home", 49.99, 75);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("BackPack", "School", 39.99, 47);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Pencils", "School", 9.99, 55);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Blanket", "Home", 69.99, 60);

INSERT INTO products (product_Name, department_name, price, stock_quantity)
VALUES ("Shorts", "Sports", 20.00, 89);


/* How to UPDATE */ 

UPDATE products SET stock_quantity = 100 WHERE id = 1; 


CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100),
    over_head_costs INTEGER(10), 
    PRIMARY KEY (department_id)

); 