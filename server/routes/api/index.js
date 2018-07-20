const Router = require("koa-router");

const profile = require("./profile");
const films = require("./films");

const router = new Router();

router.use("/profile", profile);
router.use("/films", films);

module.exports = router.routes();