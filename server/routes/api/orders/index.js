const Router = require("koa-router");

const controller = require("../../../controllers/order");

const router = new Router();

router.get("/", controller.getAll);
router.post("/", controller.newOrder);

module.exports = router.routes();
