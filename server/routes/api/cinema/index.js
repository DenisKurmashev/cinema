const Router = require("koa-router");
const controller = require("../../../controllers/cinema");

const router = new Router();

router.get("/", controller.getWithPaginate);
router.get("/:id", controller.getById);
router.post("/", controller.new);

module.exports = router.routes();