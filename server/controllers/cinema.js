const joi = require("joi");

const Cinema                   = require("../models/cinema");
const errors                   = require("../helpers/errors");
const { DEFAULT_ROOM_SCHEMAS } = require("../constants/constants");
const { validateNewCinema }    = require("../services/cinema");

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

exports.getAllSchemas = async ctx => {
    ctx.body = DEFAULT_ROOM_SCHEMAS || [];
};

exports.new = async ctx => {
    const { error, status, data } = await validateNewCinema(ctx.request.body);

    if (!status) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = error.details;
        return;
    }

    try {
        await (new Cinema(data)).save();

    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = ex;
        return;
    }

    ctx.status = 201;
    ctx.body = "OK";

};