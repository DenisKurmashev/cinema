const moment = require("moment");

module.exports = async (ctx, next) => {
  let requestBody = "";

  try {
    requestBody = JSON.stringify(ctx.request.body);
  } catch (ex) {
    console.log("Can't stringify {ctx.request.body} in {logger} middleware.");
  }

  console.log(
    `${moment().format("HH:mm:ss")} ${ctx.method} ${ctx.path} ${requestBody}`
  );

  await next();
};
