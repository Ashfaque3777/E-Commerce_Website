const express = require("express");
const cors = require("cors");
const db = require("./databaseConfig.js");
const productRouter = require("./routes/productRoutes.js");
const cartRouter = require("./routes/cartRoutes.js");
const clientRouter = require("./routes/clientRoutes.js");
const adminRouter = require("./routes/adminRoutes.js");
const dotenv = require("dotenv");

dotenv.config();
let app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));
app.use("/api", productRouter);
app.use("/api", cartRouter);
app.use("/api", clientRouter);
app.use("/api", adminRouter);

db.connect((err) => {
  if (err) throw err;
  else {
    console.log("database connected");
  }
});

let productTableQuery = `CREATE TABLE if not exists product (
id INT NOT NULL AUTO_INCREMENT,
productType VARCHAR(255) NULL,
productBrand VARCHAR(255) NULL,
productPrice INT NULL,
productRating FLOAT NULL,
image VARCHAR(255) NULL,
PRIMARY KEY (id));`;
db.query(productTableQuery, (err, rusult) => {
  if (err) throw err;
  else {
    console.log("product table created");
  }
});

let cartTableQuery = `CREATE TABLE if not exists cart (
id INT NOT NULL AUTO_INCREMENT,
productType VARCHAR(255) NULL,
productBrand VARCHAR(255) NULL,
productPrice INT NULL,
productRating FLOAT NULL,
image VARCHAR(255) NULL,
PRIMARY KEY (id));`;
db.query(cartTableQuery, (err, rusult) => {
  if (err) throw err;
  else {
    console.log("cart table created");
  }
});

let clientTableQuery = `CREATE TABLE if not exists clientlist (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NULL,
email VARCHAR(255) NULL,
password VARCHAR(255) NULL,
phone VARCHAR(255) NULL,
image VARCHAR(255) NULL,
PRIMARY KEY (id));`;
db.query(clientTableQuery, (err, rusult) => {
  if (err) throw err;
  else {
    console.log("client table created");
  }
});

app.listen(240, () => {
  console.log("server is running....");
});
