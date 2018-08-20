const joi = require("joi");

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
    validateNewAdditional,
};