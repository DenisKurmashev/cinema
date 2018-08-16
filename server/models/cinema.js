const { DEFAULT_ROOM_SCHEMAS } = require("../constants/constants");
const mongoose = require("../context");
const Schema = mongoose.Schema;

const CINEMA = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    city: {
        type: Schema.Types.String,
        required: true,
    },
    rooms: {
        type: [
            {
                placeSchema: [[]],
            }
        ],
        default: DEFAULT_ROOM_SCHEMAS,      
    },
});

module.exports = mongoose.model("Cinema", CINEMA);

