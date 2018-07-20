const errors = require("../helpers/errors");

module.exports = (accessFor = "admin") => 
    async (ctx, next) => {

        if ("state" in ctx) {
            if ("user" in ctx.state) {
                if (ctx.state.user.role === accessFor) {
                    await next();
                    return;
                }                    
            }
        }

        ctx.status = errors.accessDenied.status;
        ctx.body = errors.accessDenied;

    };