

// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database:'custom-lms'
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });


// module.exports = con;

// var Sequelize = require('sequelize');

// const sequelizeConnection = new Sequelize('custom-lms', 'root', 'root', {
//   host: 'localhost',
//   dialect: 'mysql',

//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }, 
  
// });

// sequelizeConnection 
//   .authenticate()
//   .then(() => {  
//   	console.log('======================='); 
//     console.log('Connection successfully.');
//     console.log('=======================');   
//   })
//   .catch(err => {
//   	console.log('======================='); 
//     console.error('Unable to connect to the database:', err);
//     console.log('======================='); 
//   });

// module.exports = sequelizeConnection;
 
