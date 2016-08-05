var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PointSchema = new Schema({
  name: String,
  location: [Number],
  category: {
    type: [String],
    index: true
  }
});

PointSchema.index({
  location: '2d'
});

module.exports = mongoose.model('Points', PointSchema);
