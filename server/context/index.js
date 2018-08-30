const mongoose = require("mongoose");
const config = require("../config.json");

mongoose.connect(
  config.db.host,
  config.db.options
);

module.exports = mongoose;
