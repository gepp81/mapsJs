var express = require('express');
var pathFunctions = require('path');
var router = express.Router();
var Category = require('../models/category');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(pathFunctions.join(__dirname, '..', 'public', 'views', '/index.html'));
});

router.get('/editor', function(req, res, next) {
  res.sendFile(pathFunctions.join(__dirname, '..', 'public', 'views', 'editor', '/index.html'));
});

module.exports = router;
