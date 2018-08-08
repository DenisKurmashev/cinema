const Order    = require("../models/order");
const Session  = require("../models/session");
const errors   = require("../helpers/errors");
const util     = require("../util/util");

const { validateNewOrder } 
    = require("../services/services");

const getAll = async ctx => {
    const userId = ctx.state.user._id;

    const orders = await Order
        .find({ customer: userId })
        .populate("session")
        .populate({ path: "session", populate: { path: "cinema", select: "name city rooms" } })
        .populate({ path: "session", populate: { path: "film", select: "name released cover description" } })
        .lean();

    ctx.status = 200;
    ctx.body = orders;

};

// add to {session.selectedPlaces} this place
// and create new order
const newOrder = async ctx => {
    const { session, place, additional } = ctx.request.body;

    const placeObject = util.parsePlaceString(place);
    if (!placeObject) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = errors.wrongCredentials;
        return;
    }

    const validation = await validateNewOrder({ session, additional: JSON.parse(additional) });

    if (validation.error || !validation.status) {
        console.log(validation.error);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = validation.error.message;
        return;
    }

    const currentSession = await Session.findById(session);
    if (!currentSession) {
        ctx.status = errors.wrongCredentials.status;
        ctx.body = errors.wrongCredentials;
        return;
    }
    const placeObjectId = currentSession.selectedPlaces.length;
    for (let i = 0; i < currentSession.selectedPlaces.length; i++) {
        if (
            currentSession.selectedPlaces[i].x === placeObject.x &&
            currentSession.selectedPlaces[i].y === placeObject.y 
        ) {
            console.log("This place already selected!");
            ctx.status = errors.wrongCredentials.status;
            ctx.body = {
                error: "This place already selected!",
            };
            return;
        }
    }
    currentSession.selectedPlaces.push(placeObject);
    currentSession.save();

    const userId = ctx.state.user._id;

    let order;
   
    try {
        order = new Order({ ...validation.data, customer: userId, place: placeObjectId });
        await order.save();

    } catch(ex) {
        console.log(ex);
        ctx.status = errors.wrongCredentials.status;
        ctx.body = ex;
        return;
    }

    ctx.status = 201;
    ctx.body = order;
};

module.exports = {
    getAll,
    newOrder,
};
