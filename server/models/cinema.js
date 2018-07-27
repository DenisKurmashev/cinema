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
        default: [
            // TO-DO: write default rooms schemas
            {
                placeSchema: [
                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
                    [ 2, 2, 0, 2, 2, 0, 0, 3, 3, 3 ],
                ]
            },
            {
                placeSchema: [
                    [ 1, 1, 1, 1, 1, 1, 1 ],
                    [ 1, 1, 1, 1, 1, 1, 1 ],
                    [ 1, 1, 1, 1, 1, 1, 1 ],
                    [ 1, 1, 1, 1, 1, 1, 1 ],
                    [ 0, 2, 2, 0, 2, 2, 0 ],
                ]
            }
        ],      
    },
});

module.exports = mongoose.model("Cinema", CINEMA);

