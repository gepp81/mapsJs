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

router.post('/point/byAll', function(req, res, next) {
  var search = {};
  var canSearch = false;

  if (Array.isArray(req.body.idCategories) && req.body.idCategories.length > 0) {
    search['category'] = {
      $in: req.body.idCategories
    };
    canSearch = true;
  }
  if (req.body.circle !== undefined && req.body.circle.lon != undefined && req.body.circle.lat !== undefined && req.body.circle.radius !== undefined) {
    search['location'] = {
      $near: [req.body.circle.lon, req.body.circle.lat],
      $maxDistance: req.body.circle.radius / 1000 / 111.12
    };
    canSearch = true;
  }
  if (canSearch) {
    Point.find(search,
      function(err, points) {
        if (err)
          res.send(err);
        res.json(points);
      });
  } else {
    res.json([]);
  }
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
