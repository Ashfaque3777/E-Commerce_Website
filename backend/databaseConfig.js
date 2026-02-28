const dotenv = require("dotenv");
const mysql = require("mysql2");

dotenv.config();

let connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
});

module.exports = connection;
