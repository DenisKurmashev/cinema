const Router = require("koa-router");
const controller = require("../../../controllers/films");

const router = new Router();

router.get("/", controller.getAll);
router.get("/:pageId", controller.getWithPaginate);
router.post("/", controller.new);

module.exports = router.routes();