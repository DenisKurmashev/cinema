const mongoose = require("../context");
const Schema = mongoose.Schema;

const ORDER = new Schema({
    session: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Session",
    },
    customer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    place: {
        x: Schema.Types.Number,
        y: Schema.Types.Number, 
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