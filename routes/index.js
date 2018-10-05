var express = require('express');
var db = require('../db/database')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	var sql = 'select * from user_registraion';

	db.query(sql, function(err, result) {
		if(err){
			// console.log('data error')
			res.send(err);
		}else{
			// console.log(res)
			res.send(result);
		}
	})

});

router.get('/niranjan', function(req, res, next) {
   res.render('niranjan', { title: 'bhaurao' });
});





module.exports = router;
