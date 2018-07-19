const jwt = require("jsonwebtoken");
const joi = require("joi");

const User = require("../models/user");
const config = require("../config.json");
const errors = require("../helpers/errors");

exports.login = async ctx => {
    if (!ctx.request.body.email || !ctx.request.body.password) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = errors.wrongCredentials;
    } else {
        const validateSchema = joi.object().keys({
            email: joi.string().email(),
            password: joi.string().min(5).regex(/^[a-zA-Z0-9]{3,30}$/)
        });
        
        try {
            await joi.validate(ctx.request.body, validateSchema);
        } catch(ex) {
            return ctx.body = ex.details;
        }

        const { email, password } = ctx.request.body;

        let user = await User.findOne({ email }).select("name email role created");

        if (!user || !user.verify(password)) {
            ctx.status = errors.wrongCredentials.status;
            ctx.body = errors.wrongCredentials;
            return;
        }

        let userObject = {
            name: user.name,
            email: user.email,
            created: user.created,
            role: user.role,
        };

        ctx.status = 200;
        ctx.body = { user: userObject, token: "bearer " + jwt.sign({ id: user._id }, config.jwt) };

    }
};

exports.register = async ctx => {
    if (!ctx.request.body.name || !ctx.request.body.email || !ctx.request.body.password) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = errors.wrongCredentials;
    } else {
        const validateSchema = joi.object().keys({
            name: joi.string().min(3),
            email: joi.string().email(),
            password: joi.string().min(5).regex(/^[a-zA-Z0-9]{3,30}$/)
        });
        
        try {
            await joi.validate(ctx.request.body, validateSchema);
        } catch(ex) {
            console.log(ex);
            ctx.status = errors.wrongCredentials.status;
            ctx.body = ex.details;
            return;
        }

        let user; 
        
        try {
            user = new User(ctx.request.body);
            await user.save(); 
        } catch(ex) {
            console.log(ex);
            ctx.status = errors.wrongCredentials.status;
            ctx.body = ex;
            console.log(ctx.status, ctx.body)
            return;
        }

        const userObject = {
            name: user.name,
            email: user.email,
            created: user.created,
            role: user.role,
        };
        
        ctx.status = 201;
        ctx.body = { user: userObject, token: "bearer " + jwt.sign({ id: user._id }, config.jwt) };

    }
};