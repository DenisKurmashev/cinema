const mongoose = require("mongoose");
const config = require("../config.json");

// you should always the the connection on sucess/error like this
// mongoose.connect(...).then(sucessCb, errorCb)
mongoose.connect(config.db.host, config.db.options);

module.exports = mongoose;