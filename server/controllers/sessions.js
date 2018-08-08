const joi = require("joi");

const Session = require("../models/session");
const Type    = require("../models/type");
const errors  = require("../helpers/errors");
const util    = require("../util/util");

const { validatePendingPlaceData } 
              = require("../services/services");

exports.getAll = async ctx => {
    const skip = parseInt(ctx.query.pageId || 1);
    
    try {
        await joi.validate(skip, joi.number());
    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = ex.details;
        return;
    }

    let sessions;
    let count = 0;
    
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

        count = await Session.count();

    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = ex;
        return;
    }

    ctx.status = 200;
    ctx.body = { data: util.optimizeSessions(sessions), count };
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

        const types = await Type.find({}).lean();
        session = util.addRoomTypes(types, session);

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

exports.addToPendingPlace = async ctx => {
    const userId = ctx.state.user._id;
    const seanceId = ctx.params.seanceId;
    const { x, y } = ctx.request.body;

    const validation = await validatePendingPlaceData({ seanceId, x, y, });
    if (!validation.status || validation.error) {
        console.log(validation.error);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = validation.error.message;
        return;
    }

    // add to pending array 
    // for 5 minutes
    let removeAt = new Date(Date.now() + (60 * 5 * 1000));
 
    const currentSeance = await Session.findById(seanceId);
    if (!currentSeance) {
        console.log(validation.error);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = errors.wrongCredentials;
        return;
    }
   
    try {
        currentSeance.pendingPlaces.push({ x, y, removeAt });
        await currentSeance.save();

    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = ex;
        return;
    }

    ctx.status = 200;
};

exports.search = async ctx => {
    const skip = parseInt(ctx.params.pageId);

    if (!ctx.request.body.filter || !ctx.request.body.text) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = errors.wrongCredentials;
    } else {
        const { filter, text } = ctx.request.body;

        const validateSchema = joi.object().keys({
            filter: joi.string().min(4).valid("city", "cinema", "film_name", "date", "one_place_exist"),
            text: filter !== "date" ? joi.string() : joi.date(),
            skip: joi.number(),
        });

        try {
            await joi.validate({ ...ctx.request.body, skip }, validateSchema);
        } catch(ex) {
            console.log(ex);
            ctx.status = errors.wrongCredentials.status;
            ctx.body = ex.details;
            return;
        }

        let result;
        let _result;
        let count = 0;

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
            count = result.length;              
        } else if (filter === "cinema") {
            result = _result.filter(item => item.cinema.name.toLowerCase().includes(text.toLowerCase()));  
            count = result.length;      
        } else if (filter === "film_name") {
            result = _result.filter(item => item.film.name.toLowerCase().includes(text.toLowerCase()));  
            count = result.length;      
        } else if (filter === "date") {
            // TO-DO: optimize data search
            result = _result.filter(item => Date.parse(item.date) === Date.parse(text));  
            count = result.length;      
        } else if (filter === "one_place_exist") {
            result = _result.filter(item => item.film.name.toLowerCase().includes(text.toLowerCase()));
            result = util.isMoreThanOnePlaceExist(result); 
            count = result.length;      
        }

        ctx.body = 200;
        ctx.body = { data: util.optimizeSessions(result.slice((skip - 1) * 9, ((skip - 1) * 9) + 9)), count };

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