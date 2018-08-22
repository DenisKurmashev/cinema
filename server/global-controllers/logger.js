const moment = require("moment");

module.exports = async (ctx, next) => {
    console.log(
        `${moment().format("HH:mm:ss")} ${ctx.method} ${ctx.path} ${JSON.stringify(ctx.request.body)}`
    );

    await next();
};