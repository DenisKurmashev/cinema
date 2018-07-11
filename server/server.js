const Koa = require("koa");
const serve = require('koa-static');
const koaException = require('koa-exception');
const bodyParser = require('koa-bodyparser');

module.exports = (db, config) => {
    const app = new Koa();

    app.use(koaException());
    app.use(serve(`${__dirname}/public`));
    app.use(bodyParser());


    return app;
};