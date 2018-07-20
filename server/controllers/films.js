const Film = require("../models/film");

// ONLY FOR ADMIN

exports.getAll = async ctx => {
    ctx.body = ctx.state.user;
};

exports.getById = async ctx => {
    ctx.body = ctx.params.id;
};

exports.addFilm = async ctx => {};