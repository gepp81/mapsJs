var express = require('express');
var router = express.Router();
var Category = require('../models/category');

router.get('/', function(req, res, next){
  Category.find(function(err, categories){
    if (err)
      res.send(err);
    res.json(categories);
  });
});

router.post('/', function(req, res, next){
  Category.count({name:req.body.name}, function(err, counts){
      if (counts > 0) {
        res.status(500).send("Exists this name");
      } else {
        var cat = new Category({
          name : req.body.name
        });
        cat.save(function(err, result){
          if (err)
            res.status(500).send(err);
          res.json(result);
        });
      }
  });
});

module.exports = router;
