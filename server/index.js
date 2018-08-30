const server = require("./server")();

const PORT = process.env.PORT || 3001;

(async () => {
  server.listen(PORT, () => console.log("Running :" + PORT));
})();
