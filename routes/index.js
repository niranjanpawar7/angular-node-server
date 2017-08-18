var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	  res.render('index', { title: 'Express' });
});


router.post('/savedata', function(req, res) {
	   console.log('==== node api =======');	
	   console.log(req.body);
	   console.log('==== node api =======');	
});

module.exports = router;
