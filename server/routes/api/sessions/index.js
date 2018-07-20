const Router = require("koa-router");

const controller = require("../../../controllers/sessions");
const permission = require("../../../global-controllers/permission");

const router = new Router();

router.get("/:pageId", controller.getAll);
router.get("/one/:id", controller.getById);
router.post("/new", permission(), controller.new);

module.exports = router.routes();