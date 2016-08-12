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

function generateSearch(req) {
  var search = {
    can: false
  };

  var categories = req.body.idCategories;
  if (Array.isArray(categories) && categories.length > 0) {
    search['category'] = {
      $in: categories
    };
    search['can'] = true;
  }
  var circle = req.body.circle;
  if (circle !== undefined && circle.lon != undefined && circle.lat !== undefined) {
    if (circle.radius === undefined) {
      circle.radius = 500;
    }
    search['location'] = {
      $near: [circle.lon, circle.lat],
      $maxDistance: circle.radius / 1000 / 111.12
    };
    search['can'] = true;
  }
  return search;
}

router.post('/point/byAll', function(req, res, next) {
  var search = generateSearch(req);
  if (search.can) {
    delete search.can;
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
