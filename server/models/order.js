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
        type: Schema.Types.Number,
        required: true,
    },
    additional: [
        {
            additional: {
                type: Schema.Types.ObjectId,
                ref: "Additional",
                required: true,
            },
            count: {
                type: Schema.Types.Number,
                required: true,
            }
        }
    ],
    created: {
        type: Schema.Types.Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Order", ORDER);