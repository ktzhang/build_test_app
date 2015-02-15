'use strict';

/* This module is meant to house all of the API 
 * routes that pertain to users
 */
var express = require('express');
var router = express.Router();

/**
 * GET /
 * Home page.
 */
router.get('/', function(req, res) {
  res.send('Hello');
});

module.exports = router;
