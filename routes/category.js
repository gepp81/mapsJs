var express = require('express');
var router = express.Router();
var Category = require('../models/category');

router.get('/', function(req, res, next){
  Category.find(function(err, categories){
    if (err)
      res.send(err);
    else {
      res.json(categories);
    }
  });
});

module.exports = router;
