const Router = require("koa-router");
const controller = require("../../../controllers/cinema");

const router = new Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/new", controller.new);

module.exports = router.routes();