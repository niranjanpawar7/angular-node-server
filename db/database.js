var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '',
    user     : 'root',
    password : 'root',
    database : 'mydb'
});
connection.connect();
module.exports = connection;