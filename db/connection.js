require('dotenv').config();

const util = require("util");
const mysql = require("mysql");
const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
    host: "localhost",
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadID}\n`)
});

connection.query = util.promisify(connection.query);

module.exports = connection;