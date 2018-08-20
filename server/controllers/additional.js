const Additional = require("../models/additional");
const errors = require("../helpers/errors");
const { validateNewAdditional } = require("../services/additional");

const getAll = async ctx => {
    const additional = await Additional
        .find()
        .select("name price description")
        .lean();

    ctx.status = 200;
    ctx.body = additional;
};

const newAdditional = async ctx => {
    const { error, status, data } = await validateNewAdditional(ctx.request.body);

    if (!status) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = error.details;
        return;
    }

    try {
        const additional = new Additional(data);
        await additional.save();
    } catch(ex) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = ex;
        return;
    }

    ctx.status = 201;
    ctx.body = "OK";
};

module.exports = {
    getAll,
    newAdditional,
};