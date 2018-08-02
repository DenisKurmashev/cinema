const mongoose = require("../context");
const Schema = mongoose.Schema;

const TYPE = new Schema({
    matrixNumber: {
        type: Schema.Types.Number,
        unique: true,
        required: true,
    },
    name: {
        type: Schema.Types.String,
        required: true,
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

module.exports = mongoose.model("Type", TYPE);