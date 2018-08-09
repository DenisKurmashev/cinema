const Router = require("koa-router");

const controller = require("../../../controllers/sessions");
const permission = require("../../../global-controllers/permission");
const passport = require("../../../global-controllers/passport");

const router = new Router();

router.get("/", controller.getAll); // ?pageId=1
router.get("/:id", controller.getById);
router.post("/pending/:seanceId", passport.authenticate(), controller.addToPendingPlace); 
router.delete("/pending/:seanceId", passport.authenticate(), controller.removeFromPending); 
router.post("/search/:pageId", controller.search);
router.post("/new", passport.authenticate(), permission(), controller.new);

module.exports = router.routes();