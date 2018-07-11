const Koa = require("koa");
const serve = require('koa-static');
const koaException = require('koa-exception');
const bodyParser = require('koa-bodyparser');

module.exports = (db, config) => {
    const app = new Koa();
    
    // Controllers
    const logger = require("./global-controllers/logger");

    // Mounting
    app.use(koaException());
    app.use(serve(`${__dirname}/public`));
    app.use(bodyParser());

    app.use(logger);

    return app;
};