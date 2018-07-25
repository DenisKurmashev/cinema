const joi = require("joi");

const Session = require("../models/session");
const errors = require("../helpers/errors");

exports.getAll = async ctx => {
    const skip = parseInt(ctx.params.pageId);
    
    try {
        await joi.validate(skip, joi.number());
    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = ex.details;
        return;
    }


    let sessions;
    
    try {
        sessions = await Session
            .find({})
            .skip((skip - 1) * 10)
            .limit(10)
            .populate("cinema", "name city rooms")
            .populate("film", "name released cover description")
            .select("cinema film date")
            .lean();

    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = ex;
        return;
    }

    ctx.status = 200;
    ctx.body = sessions;    
    
};

exports.getById = async ctx => {
    const id = ctx.params.id;

    try {
        await joi.validate(id, joi.string().min(24));
    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = ex.details;
        return;
    }

    let session;
    
    try {
        session = await Session
            .findById(id)
            .populate("cinema", "name city rooms")
            .populate("film", "name released cover description")
            .select("cinema film date")
            .lean();

    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = ex;
        return;
    }


    if (!session) {
        ctx.status = 200;
        ctx.body = {}; 
    } else {
        ctx.status = 200;
        ctx.body = session; 
    }

};

// Access only for admin
exports.new = async ctx => {
    if (!ctx.request.body.cinema || !ctx.request.body.film || !ctx.request.body.date) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = errors.wrongCredentials;
    } else {
        const validateSchema = joi.object().keys({
            cinema: joi.string().min(24),
            film: joi.string().min(24),
            date: joi.date(),
        });

        try {
            await joi.validate(ctx.request.body, validateSchema);
        } catch(ex) {
            console.log(ex);
            ctx.status = errors.wrongCredentials.status;
            ctx.body = ex.details;
            return;
        }

        let session;

        try {
            session = new Session(ctx.request.body);
            await session.save();
        } catch(ex) {
            console.log(ex);
            ctx.status = errors.wrongCredentials.status;
            ctx.body = ex;
            return;
        }

        ctx.status = 201;
        ctx.body = "OK";

    }
};