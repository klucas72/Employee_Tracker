//required dependencies
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const util = require("util");
const mysql = require("mysql");
const mysql2 = require("mysql2");

//creating connection to the database
const connection = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
//connection status to database
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
});

//allowing promises for connection queries
connection.query = util.promisify(connection.query);

module.exports = connection;
