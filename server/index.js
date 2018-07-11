const mongoose = require("mongoose");

const config = require("./config.json");

const db = require("./context")(mongoose, config);
const server = require("./server")(db, config);

const PORT = process.env.PORT || 3000;

(async () => {
    server.listen(PORT, () => console.log("Running"));
})();