const Router = require("koa-router");
const controller = require("../../../controllers/films");
const passport = require("../../../global-controllers/passport");

const router = new Router();

router.get("/", passport.authenticate(), controller.getAll);
router.get("/:id", passport.authenticate(), controller.getById);

module.exports = router.routes();