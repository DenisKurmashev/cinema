const joi = require("joi");

const Film = require("../models/film");
const errors = require("../helpers/errors");
const { validateNewFilm } = require("../services/film");

// ONLY FOR ADMIN

// Note: try to add new film and see the films list 
// Note: Find some films and click last pagination item
const getWithPaginate = async ctx => {
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

const newFilm = async ctx => {
    const { status, error, data } = await validateNewFilm(ctx.request.body);

    if (!status) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = error.details;
        return;
    }

    let film;

    try {
        film = new Film(data);
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

module.exports = {
    getWithPaginate,
    newFilm
};