'use strict';

/* This module is meant to house all of the API 
 * routes that pertain to users
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bodyparser = require('body-parser');
var urlparser = bodyparser.urlencoded({extended: false});

router.get('/users', function(req, res) {
  User.find({}, function(err, result) {
    if(err){
      res.status(400).send('There was a problem fetching all of the users');
      return;
    }
    res.json(JSON.stringify(result));
  });
});

/* Return user with the specifed user_id */
router.get('/user/:id', function(req, res) {
  /* Get id param from request */
  var user_id = req.params.id;

  if(!user_id) {
    res.status(400).send('need a user id');
    return;
  }

  User.find({_id: user_id}, function(err, result) {
    if(err) {
      res.status(500).send('There was problem fetching the user'); 
      return;
    }
    res.json(JSON.stringify(result));
  });
});

/* Inserts a new user into the databse */
router.post('/user', urlparser, function(req, res) {
  if(!req.body){
    return res.status(400).send('there was a problem saving the user');
  }

  /* Get requet's forms post params */
  var user_name = req.body.user_name;
  var user_email = req.body.user_email;

  /* create new user from databse model*/
  var new_user = new User({
      user_name: user_name,
      user_email: user_email
  });

  /* make new user persistant */
  new_user.save(function(err) {
    if(err){
      res.status(400).send('there was a problem saving the user')
      return;
    }
    res.json('created user: ' + new_user);
  });
}); 

/* Delete a new user into the databse */
router.delete('/user/:id', urlparser, function(req, res) {
  /* Get id param from request */
  var user_id = req.params.id;

  if(!user_id) {
    res.status(400).send('need a user id');
    return;
  }

  User.findOneAndRemove({_id: user_id}, function(err, result) {
    if(err) {
      res.status(500).send('There was problem removing the user'); 
      return;
    }
    res.json(JSON.stringify(result) + ' removed');
  });
}); 

module.exports = router;