const mongoose = require("../context");
const Schema = mongoose.Schema;

const SESSION = new Schema({
  cinema: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Cinema"
  },
  film: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Film"
  },
  date: {
    type: Schema.Types.Date,
    required: true
  },
  roomNumber: {
    type: Schema.Types.Number,
    required: true
  },
  selectedPlaces: [
    {
      x: Schema.Types.Number,
      y: Schema.Types.Number
    }
  ],
  pendingPlaces: [
    {
      x: Schema.Types.Number,
      y: Schema.Types.Number,
      removeAt: Schema.Types.Date,
      author: Schema.Types.ObjectId
    }
  ]
});

module.exports = mongoose.model("Session", SESSION);
