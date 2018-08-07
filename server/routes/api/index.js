const Router = require("koa-router");

const profile    = require("./profile");
const films      = require("./films");
const sessions   = require("./sessions");
const cinema     = require("./cinema");
const order      = require("./orders");
const additional = require("./additional");

const passport = require("../../global-controllers/passport");
const permission = require("../../global-controllers/permission");

const router = new Router();

router.use("/profile", profile);
router.use("/films", passport.authenticate(), permission(), films);
router.use("/sessions", sessions);
router.use("/cinema", passport.authenticate(), permission(), cinema);
router.use("/orders", passport.authenticate(), order);
router.use("/additional", additional);

module.exports = router.routes();