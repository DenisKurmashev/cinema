const joi = require("joi");

const Film = require("../models/film");
const errors = require("../helpers/errors");

// ONLY FOR ADMIN

exports.getWithPaginate = async ctx => {
    const pageId   = parseInt(ctx.query.pageId || 0, 10);
    const pageSize = parseInt(ctx.query.pageSize || 10, 10);

    let films      = [], 
        filmsCount = 0;

    try {
        films = await Film
            .find({})
            .skip(pageId * pageSize)
            .limit(pageSize)
            .select("cover name")
            .lean();

        filmsCount = await Film.count();

    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = ex;
        return;
    }

    ctx.status = 200;
    ctx.body = { films, pageCount: Math.ceil(filmsCount / pageSize) };
};

exports.new = async ctx => {
    const { name, released, cover, description } = ctx.request.body;

    if (!name || !released || !cover || !description) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = errors.wrongCredentials;
        return;
    }

    const validateSchema = joi.object().keys({
        name: joi.string().min(3),
        released: joi.date(),
        cover: joi.string().min(6),
        description: joi.string().min(25),
    });

    try {
        await joi.validate({ name, released, cover, description }, validateSchema);
    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        return ctx.body = ex.details;
    }

    let film;

    try {
        film = new Film(ctx.request.body);
        await film.save();
    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = ex;
        return;
    }

    ctx.status = 201;
    ctx.body = "OK";

};