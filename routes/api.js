var express = require('express');
var router = express.Router();
var Point = require('../models/point');

/* GET home page. */
router.get('/point', function(req, res, next) {
  Point.find(function(err, points) {
    if (err)
      res.send(err);
    res.json(points);
  });
});

router.post('/point', function(req, res, next) {
  var point = new Point({
    name: req.body.name,
    location: req.body.location
  });
  point.save(function(err, pointDb) {
    if (err)
      res.send(err);
    res.json(pointDb);
  });
});

module.exports = router;
