 var express = require('express');
var db = require('../db/database')
var router = express.Router();
var crypto = require('crypto');

/* GET users listing. */
router.post('/savedata', function(req, res, next) {

	var username = req.body.username;
	var contact = req.body.contact;
	var email = req.body.email;
	var pass = req.body.password;
	var confirmpass = req.body.password;

  	var sql = "INSERT INTO user_registraion (username, email, contact, password, confpassword) VALUES ("+"'"+ username + "','"+ email+"','"+ contact+ "' ,'"+ pass+ "','" + confirmpass+"')";

  	console.log('====================');
  	console.log(sql);
  	console.log('====================');

	db.query(sql, function(err, result) {
		if(err){
			res.send(err);
		}else{
			res.send(result);
		}
	});

});

router.post('/userData', function(req, res, next) {


		console.log('=================', req.headers.authorization);
		var token = req.headers.authorization;
		token = token.split('_');
		console.log('++++++++++++++++++++++++', token);
		token = token[1];
		console.log('=================', token);



		var checkToken = "select * from token_table WHERE token = '"+ token +"'";

		db.query(checkToken, function(err, result) {
		if(err){
			res.send(err);
		}else{
			//res.send(result);
		var userData = "select * from user_registraion WHERE id = '"+ result[0].user_id +"'";

		db.query(userData	, function(err, result1) {
			if(err){
				res.send(err);
			}else{
				res.send(result1);
			}
		})

	}

 })

})

router.post('/login', function(req, res, next) {

	var username = req.body.username;
	var pass = req.body.password;

	console.log(req.body)
  	var loginSql = "select * FROM user_registraion WHERE username = '"+ username +"' AND  password = '" + pass+ "'";

  	console.log(loginSql);

	db.query(loginSql, function(err, result) {
		if(err){
			res.send(err);
		}else{

		console.log('==============================');		
		console.log(result);
		console.log('==============================');
				
		if(result && result[0]){
			// anuja code
			require('crypto').randomBytes(48, function(err, buffer){

				var token = buffer.toString('hex');
				var userId = result[0].id;
				var tokenSql = "INSERT INTO token_table (token, user_id) VALUES ("+"'"+ token + "', '" + userId +"')";


				db.query(tokenSql, function(err, resultdata) {
					if(err){
						res.send(err);
					}else{
						//res.send(token);
						res.json({
							token:token,
							data:result
			 			});
					}
				});
			})
		}else{
			res.json({
						token:null,
						data:null
			 		});
		}

		}
	});

});

// need to ask
//get all states
// router.post('/getTokenData', function(req, res) {
// 	var token_data = 'SELECT * FROM token WHERE user_token = "'+req.body.token+'"';
//  		con.query(token_data, function(err, result, fields){
// 		if(result == ''){
// 			 res.json({
// 					status:false,
// 				});
// 			}
// 		else{
//      	res.json({
// 					status:true,
// 					data:result[0]
// 				});
// 	}
// 		})

//     });


module.exports = router;
