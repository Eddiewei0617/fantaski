const mysql = require("mysql");
const Promise = require("bluebird");
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  connectionlimit: process.env.CONNECTION_LIMIT || 10,
});

connect = Promise.promisifyAll(connection);

module.exports = connection;
