const joi = require("joi");

const Cinema = require("../models/cinema");
const errors = require("../helpers/errors");

exports.getAll = async ctx => {};

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