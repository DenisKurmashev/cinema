const Router = require("koa-router");
const controller = require("../../../controllers/cinema");

const router = new Router();

router.get("/", controller.getWithPaginate);
router.get("/schemas", controller.getAllSchemas);
router.get("/:id", controller.getById);
router.post("/", controller.newCinema);

module.exports = router.routes();
