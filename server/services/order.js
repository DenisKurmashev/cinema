const joi = require("joi");

const validateNewOrder = async (data) => {

    let result = {
        status: true,
        error: null,
        data
    };

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
        result.status = false;
        result.error  = ex;
    }

    return result;
};

module.exports = {
    validateNewOrder,
};