const joi = require("joi");

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

module.exports = {
    validatePendingPlaceData,
};