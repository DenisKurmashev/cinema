const Router = require("koa-router");

class Controller {
    constructor(service) {
        this.service = service;

        this.router = new Router();
        this.routes = {
            "/": [{ method: "get", cb: this.readAll }],
            "/:id": [{ method: "get", cb: this.read }],
        };
    }

    readAll = async ctx => {
        ctx.body = "Hello world!";
    }

    read = async ctx => {
        // smt here
    }

    registerRoutes = () => {
        Object.keys(this.routes).forEach(route => {
            let handlers = this.routes[route];

            if (!handlers || !Array.isArray(handlers)) 
                return;

            handlers.forEach(
                handler => this.router[handler.method](route, handler.cb)
            );
        });
    }
    
}

module.exports = Controller;