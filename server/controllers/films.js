const joi = require("joi");

const Film = require("../models/film");
const errors = require("../helpers/errors");

// ONLY FOR ADMIN

exports.getAll = async ctx => {
    ctx.body = ctx.state.user;
};

exports.getById = async ctx => {
    ctx.body = ctx.params.id;
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