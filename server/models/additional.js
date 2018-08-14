const mongoose = require("../context");
const Schema = mongoose.Schema;

const ADDITIONAL = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    price: {
        type: Schema.Types.Number,
        required: true,
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
});

module.exports = mongoose.model("Additional", ADDITIONAL);