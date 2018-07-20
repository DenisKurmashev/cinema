const Film = require("../models/film");

exports.getAll = async ctx => {
    ctx.body = ctx.state.user;
};

exports.getById = async ctx => {
    ctx.body = ctx.params.id;
};

exports.addFilm = async ctx => {};