var express = require('express');
var db = require('../db/database')
var router = express.Router();
var crypto = require('crypto');

/* GET users listing. */
router.post('/savedata', function(req, res, next) {

	var name = req.body.name;
	var contact = req.body.contact;
	var email = req.body.email;
	var pass = req.body.password;

  	var sql = "INSERT INTO user_registraion (username, email, contact, password) VALUES ("+"'"+ name + "','"+ email+"','"+ contact+ "','" + pass+"')";


	db.query(sql, function(err, result) {
		if(err){
			res.send(err);
		}else{
			res.send(result);
		}
	});

});

router.post('/userData', function(req, res, next) {
		var token = req.body.token;

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

	var email = req.body.email;
	var pass = req.body.password;

  	var loginSql = "select * from user_registraion WHERE email = '"+ email +"' and password = '" + pass+ "'";

  	console.log(loginSql);

	db.query(loginSql, function(err, result) {
		if(err){
			res.send(err);
		}else{

		console.log('===================== ', result);
		console.log('===================== ', result[0]);
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
