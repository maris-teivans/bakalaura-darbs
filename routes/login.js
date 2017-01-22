var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

router.post('/register', function(req, res) {
  Account.register(new Account({ username: req.body.username, email: req.body.email }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

router.post('/password', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    //if (err) {
    //  return next(err);
    //}
    if (!user) {
      return res.status(200).json({
        message: 'Parole nepareiza!',
        status: 401
      });
    } else {
      return res.status(200).json({
        message: 'Parole pareiza!',
        status: 200
      });
    }
  })(req, res, next);
});

router.post('/setPassword', function(req, res) {
  Account.findByUsername(req.body.username, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    if(account){
      account.setPassword(req.body.password, function(){
        account.save();
        res.status(200).json({message: 'password reset successful'});
      });
    } else {
      res.status(500).json({message: 'This user does not exist'});
    }    
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!',
        user: user
      });
    });
  })(req, res, next);
});

router.put('/user/:id', function(req, res, next){
  //var oldTask = req.body;
  var updUser = req.body;

  if (!updUser) {
    res.status(400);
    res.json({"error":"bad data"});
  } else {
    Account.findOneAndUpdate({_id: req.params.id}, updUser, {upsert:true, new:true}, function(err, user){
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  } 
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true,
    user: req.user
  });
});

router.get('/accounts', function(req, res, next){
  Account.find(function(err, accounts){
    if (err) {
      res.send(err);
    } else {
      res.json(accounts);
    }
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

module.exports = router;