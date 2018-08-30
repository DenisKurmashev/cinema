const Router = require("koa-router");
const controller = require("../../../controllers/films");

const router = new Router();

router.get("/", controller.getWithPaginate);
router.post("/", controller.newFilm);

module.exports = router.routes();
