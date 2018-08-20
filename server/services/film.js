const joi = require("joi");

const validateNewFilm = async (data) => {
    let result = {
        status: true,
        error: null,
        data,
    };

    const validateSchema = joi.object().keys({
        name:        joi.string().min(3).required(),
        released:    joi.date().required(),
        cover:       joi.string().min(6).required(),
        description: joi.string().min(25).required(),
    });

    try {
        await joi.validate(data, validateSchema);
    } catch(ex) {
        result.status = false;
        result.error = ex;
    }

    return result;
};

module.exports = {
    validateNewFilm,
};
