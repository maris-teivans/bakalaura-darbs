var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

/*router.get('/', function(req, res, next){
	res.render('index.html');
});*/

router.get('*', function (req, res, next) {
    res.render('index.html', { user : req.user });
});

module.exports = router;