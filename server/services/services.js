const joi = require("joi");

const validateNewOrder = async (data) => {

    const validateSchema = joi.object().keys({
        session: joi.string().min(24),
        place: joi.number(),
        additional: joi.string().min(24),
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


module.exports = {
    validateNewOrder,
};