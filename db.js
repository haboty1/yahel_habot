const mysql = require("mysql2");
const dbConfig = require("./db_config");

// Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});
// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

// connection.query("SELECT * from budgetdb.projects", (err, res) => {
//     return console.log(res);
// })
module.exports = connection;