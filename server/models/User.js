'use strict';

/* Require mongoose to interact with mongoDB */
var mongoose = require('mongoose');

/**
 * This will be the Schema for the User documents
**/
var user_schema = mongoose.Schema({
  user_name: String,
  user_email: String,
});

module.exports = mongoose.model('user', user_schema);
