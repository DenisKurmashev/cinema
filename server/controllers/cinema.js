const joi = require("joi");

const Cinema = require("../models/cinema");
const errors = require("../helpers/errors");

exports.getWithPaginate = async ctx => {
    const pageId   = parseInt(ctx.query.pageId || 0, 10);
    const pageSize = parseInt(ctx.query.pageSize || 10, 10);

    let cinemas      = [], 
        cinemasCount = 0;

    try {
        cinemas = await Cinema
            .find({})
            .skip(pageId * pageSize)
            .limit(pageSize)
            .select("city name rooms")
            .lean();

            cinemasCount = await Cinema.count();

    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = ex;
        return;
    }

    ctx.status = 200;
    ctx.body = { cinemas, pageCount: Math.ceil(cinemasCount / pageSize) };
};

exports.getById = async ctx => {};

exports.new = async ctx => {
    const { name, city } = ctx.request.body;

    if (!name || !city) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = errors.wrongCredentials;
        return;
    }

    const validateSchema = joi.object().keys({
        name: joi.string().min(3),
        city: joi.string().min(5),
    });

    try {
        await joi.validate({ name, city }, validateSchema);
    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        return ctx.body = ex.details;
    }

    let cinema;

    try {
        cinema = new Cinema({ name, city });
        await cinema.save();
    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = ex;
        return;
    }

    ctx.status = 201;
    ctx.body = "OK";

};