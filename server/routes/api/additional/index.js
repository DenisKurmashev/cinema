const Router = require("koa-router");
const controller = require("../../../controllers/additional");

const router = new Router();

router.get("/", controller.getAll);

module.exports = router.routes();