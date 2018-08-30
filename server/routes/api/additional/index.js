const Router = require("koa-router");
const controller = require("../../../controllers/additional");
const permission = require("../../../global-controllers/permission");
const passport = require("../../../global-controllers/passport");

const router = new Router();

router.get("/", controller.getAll);
router.post(
  "/",
  passport.authenticate(),
  permission(),
  controller.newAdditional
);

module.exports = router.routes();
