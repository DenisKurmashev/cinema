const Router = require("koa-router");

const profile = require("./profile");

const router = new Router();

router.use("/profile", profile);

module.exports = router.routes();