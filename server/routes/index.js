const Router = require("koa-router");

const api = require("./api");

const router = new Router();

router.use("/api", api);

module.exports = router.routes();