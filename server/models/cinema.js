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
                placeSchema: Schema.Types.String
            }
        ],
        default: [
            // TO-DO: write default rooms schemas
        ],      
    },
});

module.exports = mongoose.model("Cinema", CINEMA);

