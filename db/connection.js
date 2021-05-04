require('dotenv').config();

const util = require("util");
const mysql = require("mysql");

const conection = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;