const joi = require("joi");

const Session = require("../models/session");
const errors = require("../helpers/errors");
const util = require("../util/util");

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
            .where("date").gte(Date.now())
            .skip((skip - 1) * 9)
            .limit(9)
            .populate("cinema", "name city rooms")
            .populate("film", "name released cover description")
            .select("cinema film date roomNumber selectedPlaces pendingPlaces")
            .lean();

    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = ex;
        return;
    }

    ctx.status = 200;
    ctx.body = util.optimizeSessions(sessions);    
    
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
            .select("cinema film date roomNumber selectedPlaces pendingPlaces")
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
        ctx.body = util.optimizeSession(session); 
    }

};

exports.search = async ctx => {
    if (!ctx.request.body.filter || !ctx.request.body.text) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = errors.wrongCredentials;
    } else {
        const { filter, text } = ctx.request.body;

        const validateSchema = joi.object().keys({
            filter: joi.string().min(4).valid("city", "cinema", "film_name", "date", "one_place_exist"),
            text: filter !== "date" ? joi.string() : joi.date()
        });

        try {
            await joi.validate(ctx.request.body, validateSchema);
        } catch(ex) {
            console.log(ex);
            ctx.status = errors.wrongCredentials.status;
            ctx.body = ex.details;
            return;
        }

        let result;
        let _result;

        try {
            _result = await Session
                .find({})
                .populate("cinema", "name city rooms")
                .populate("film", "name released cover description")
                .select("cinema film date roomNumber selectedPlaces pendingPlaces")
                .lean();
        } catch(ex) {
            console.log(ex);
            ctx.status = errors.wrongCredentials.status;
            ctx.body = ex;
            return;
        }

        if (filter === "city") {
            result = _result.filter(item => item.cinema.city.toLowerCase().includes(text.toLowerCase()));                
        } else if (filter === "cinema") {
            result = _result.filter(item => item.cinema.name.toLowerCase().includes(text.toLowerCase()));  
        } else if (filter === "film_name") {
            result = _result.filter(item => item.film.name.toLowerCase().includes(text.toLowerCase()));  
        } else if (filter === "date") {
            // TO-DO: optimize data search
            result = _result.filter(item => Date.parse(item.date) === Date.parse(text));  
        } else if (filter === "one_place_exist") {
            result = _result.filter(item => item.film.name.toLowerCase().includes(text.toLowerCase()));
            result = util.isMoreThanOnePlaceExist(result); 
            
        }

        ctx.body = 200;
        ctx.body = util.optimizeSessions(result);

    }
};

// Access only for admin
exports.new = async ctx => {
    const { cinema, film, date, roomNumber } 
        =  ctx.request.body;

    if (!cinema || !film || !date || !roomNumber) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = errors.wrongCredentials;
    } else {
        const validateSchema = joi.object().keys({
            cinema: joi.string().min(24),
            film: joi.string().min(24),
            date: joi.date(),
            roomNumber: joi.number(),
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