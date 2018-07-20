const hash = require("../helpers/hash");
const mongoose = require("../context");
const Schema = mongoose.Schema;

const USER = new Schema({
    name: {
        type: Schema.Types.String,
        unique: true,
        required: true,
    },
    email: {
        type: Schema.Types.String,
        unique: true,
        required: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
        set: value => hash.get(value),
    },
    created: {
        type: Schema.Types.Date,
        default: Date.now(),
    },
    role: {
        type: Schema.Types.String,
        default: "user",
    },
});

USER.methods.verify = async function(value) {
    return await hash.isValid(value, this.password);
};

module.exports = mongoose.model("User", USER);