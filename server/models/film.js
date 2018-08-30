const mongoose = require("../context");
const Schema = mongoose.Schema;

const FILM = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    unique: true
  },
  released: {
    type: Schema.Types.Date,
    default: Date.now()
  },
  cover: {
    type: Schema.Types.String,
    default: null
  },
  description: {
    type: Schema.Types.String,
    required: true
  },
  comments: [
    {
      author: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      created: {
        type: Schema.Types.Date,
        default: Date.now()
      },
      text: {
        type: Schema.Types.String,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("Film", FILM);
