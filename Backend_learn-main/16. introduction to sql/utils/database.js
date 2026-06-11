const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root@1164",
  database: "airbnb",
});

module.exports = pool.promise();
