const Router = require("koa-router");

const profile = require("./profile");
const films = require("./films");
const sessions = require("./sessions");

const passport = require("../../global-controllers/passport");
const permission = require("../../global-controllers/permission");

const router = new Router();

router.use("/profile", profile);
router.use("/films", passport.authenticate(), permission(), films);
router.use("/sessions", passport.authenticate(), sessions);

module.exports = router.routes();