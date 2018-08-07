const Additional = require("../models/additional");

const getAll = async ctx => {
    const additional = await Additional
        .find()
        .select("name price description")
        .lean();

    ctx.status = 200;
    ctx.body = additional;
};

module.exports = {
    getAll,
};