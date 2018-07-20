const Session = require("../models/session");

exports.getAll = async ctx => {
    ctx.body = ctx.state.user;
};

exports.getById = async ctx => {
    ctx.body = ctx.state.user;
};

exports.new = async ctx => {
    // TO-DO add new session
};