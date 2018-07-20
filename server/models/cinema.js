const mongoose = require("../context");
const Schema = mongoose.Schema;

const CINEMA = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    city: {
        type: Schema.Types.String,
        required: true,
    },
    rooms: [
        {
            places: [
                {
                    number: {
                        type: Schema.Types.Number,
                        required: true,
                    },
                    isPending: {
                        type: Schema.Types.Boolean,
                        default: false,
                    }
                }
            ],
            schema: Schema.Types.String
        }
    ],
});

module.exports = mongoose.model("Cinema", CINEMA);