var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  _id: String
});

module.exports = mongoose.model('Category', CategorySchema);
