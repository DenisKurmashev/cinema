const bcrypt = require("bcrypt");
const config = require("../config.json");

module.exports = {
    get: plain => {
        return bcrypt.hashSync(plain, config.bcryptSalt);
    },

    isValid: async (plain, hash) => {
        return await bcrypt.compare(plain, hash);
    },
};