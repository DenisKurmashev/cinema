const path = require('path');
const Koa = require("koa");
const serve = require("koa-static");
const koaException = require("koa-exception");
const bodyParser = require("koa-bodyparser");
const morgan = require("koa-morgan");

module.exports = () => {
    const app = new Koa();
    
    // middleware
    const passport = require("./global-controllers/passport");
    const cors = require("./global-controllers/cors");

    // routes
    const routes = require("./routes");

    const p = path.resolve(`${__dirname}/../public`)

    // Mounting
    app.use(koaException());
    app.use(cors());

    app.use(serve(p));
    app.use(bodyParser());
    app.use(morgan("dev"))

    app.use(passport.initialize());
    app.use(routes);

    return app;
};