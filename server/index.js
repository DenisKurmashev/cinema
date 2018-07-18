const server = require("./server")();

const PORT = process.env.PORT || 3000;

(async () => {
    server.listen(PORT, () => console.log("Running :" + PORT));
})();