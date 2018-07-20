const mongoose = require("../context");
const Schema = mongoose.Schema;

const ORDER = new Schema({
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
    customer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    additional: [
        {
            type: Schema.Types.ObjectId,
            ref: "Additional",
        }
    ],
    created: {
        type: Schema.Types.Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Order", ORDER);