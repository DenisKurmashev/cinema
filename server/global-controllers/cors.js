module.exports = () => {
    return async (ctx, next) => {
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    
        if (ctx.request.method === "OPTIONS") {
            return ctx.status = 200;
        }
    
        await next();
    };
};