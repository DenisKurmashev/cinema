const mongoose = require("../context");
const Schema = mongoose.Schema;

const SESSION = new Schema({
    cinema: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Cinema",
    },
    film: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Film"
    },
    date: {
        type: Schema.Types.Date,
        required: true,
    },
});

module.exports = mongoose.model("Session", SESSION);