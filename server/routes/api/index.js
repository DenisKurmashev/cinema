const Router = require("koa-router");

const profile = require("./profile");
const films = require("./films");

const passport = require("../../global-controllers/passport");
const permission = require("../../global-controllers/permission");

const router = new Router();

router.use("/profile", profile);
router.use("/films", passport.authenticate(), permission(), films);

module.exports = router.routes();