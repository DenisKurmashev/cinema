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
        status: false,
        error: null,
        data,
    };

    try {
        await joi.validate(data, validateSchema);
    } catch(ex) {
        result.error = ex;
        return result;
    }

    result.status = true;
    return result;
};


module.exports = {
    validateNewOrder,
    validatePendingPlaceData,
};