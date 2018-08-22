const joi = require("joi");

const Session = require("../models/session");
const Type    = require("../models/type");
const errors  = require("../helpers/errors");
const util    = require("../util/util");

const { 
    validateSkipValue, 
    validateMongoId, 
    validateNewSeanceData, 
    validatePendingPlaceData,
    validateSearchData,
} = require("../services/session");

const getAll = async ctx => {
    const { status, error, skip} = await validateSkipValue(parseInt(ctx.query.pageId || 1));

    if (!status) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = error.details;
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

const getById = async ctx => {
    const { status, error, id} = await validateMongoId(ctx.params.id);

    if (!status) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = error.details;
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

const addToPendingPlace = async ctx => {
    const userId = ctx.state.user._id;
    const seanceId = ctx.params.seanceId;
    const { x, y } = ctx.request.body;

    const { status, error, data } = await validatePendingPlaceData({ seanceId, x, y, });
    if (!status) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = error.details;
        return;
    }

    // add to pending array 
    // for 5 minutes
    let removeAt = new Date(Date.now() + (60 * 5 * 1000));
 
    const currentSeance = await Session.findById(seanceId);
    if (!currentSeance) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = errors.wrongCredentials;
        return;
    }
   
    try {
        currentSeance.pendingPlaces.push({ x, y, removeAt, author: userId });
        await currentSeance.save();

    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = ex;
        return;
    }

    ctx.status = 200;
};

const removeFromPending = async ctx => {
    const userId = ctx.state.user._id;
    const seanceId = ctx.params.seanceId;
    const { x, y } = ctx.request.body;

    const { status, error, data } = await validatePendingPlaceData({ seanceId, x, y, });
    if (!status) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = error.details;
        return;
    }
 
    const currentSeance = await Session.findById(seanceId);
    if (!currentSeance) {
        console.log(validation.error);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = errors.wrongCredentials;
        return;
    }
   
    try {
        currentSeance.pendingPlaces 
            = currentSeance.pendingPlaces.filter(
                item => item.x !== x && item.y !== y && item.author !== userId
            );
            
        await currentSeance.save();

    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = ex;
        return;
    }

    ctx.status = 200;
};

const search = async ctx => {
    const skip = parseInt(ctx.params.pageId);
    const { status, error, data } = await validateSearchData({ ...ctx.request.body, skip }) 
    const { filter, text } = data;

    if (!status) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = error.details;
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
    
};

// Access only for admin
const newSeance = async ctx => {
    const { status, error, data } = await validateNewSeanceData(ctx.request.body)

    if (!status) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = error.details;
        return;
    }
    
    let session;

    try {
        session = new Session(data);
        await session.save();
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
    getAll, 
    getById,
    addToPendingPlace,
    removeFromPending,
    search,
    newSeance,
};