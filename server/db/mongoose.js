var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/BenchmarkData/db/');

module.exports = {
  mongoose
};