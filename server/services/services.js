const joi = require("joi");

const validateNewOrder = async (data) => {

    const validateSchema = joi.object().keys({
        session: joi.string().min(24),
        additional: joi.array().items(joi.object().keys({
            additional: joi.string().min(24),
            count: joi.number()
        })),
    });

    try {
        await joi.validate(data, validateSchema);
    } catch(ex) {
        return {
            status: false,
            error: ex,
            data
        };
    }

    return {
        status: true,
        error: null,
        data
    };
};

const validatePendingPlaceData = async (data) => {
    const validateSchema = joi.object().keys({
        seanceId: joi.string().min(24),
        x: joi.number(),
        y: joi.number()
    });

    let result = {
        status: true,
        error: null,
        data,
    };

    try {
        await joi.validate(data, validateSchema);
    } catch(ex) {
        result.status = false;
        result.error = ex;
    }

    return result;
};

const validateNewAdditional = async (data) => {
    const validateSchema = joi.object().keys({
        name: joi.string().min(3),
        price: joi.number(),
        description: joi.string().min(15)
    });

    let result = {
        status: true,
        error: null,
        data,
    };

    try {
        await joi.validate(data, validateSchema);
    } catch(ex) {
        result.status = false;
        result.error = ex;
    }

    return result;
};

module.exports = {
    validateNewOrder,
    validatePendingPlaceData,
    validateNewAdditional,
};