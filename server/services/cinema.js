const joi = require("joi");
const { deepCopy } = require("../util/util");

const validateNewCinema = async (data) => {
    let validateObject = deepCopy(data);

    if (data.rooms) {
        try {
            validateObject = JSON.parse(data.rooms);
        } catch(ex) {
            console.log(ex);
            delete validateObject.rooms;
        }
    }

    let result = {
        error: null,
        status: true,
        data: validateObject
    };
    
    const validateSchema = joi.object().keys({
        name: joi.string().min(3).required(),
        city: joi.string().min(5).required(),
        rooms: joi.array().items(joi.object().keys({
            placeSchema: joi.array().items(
                joi.array().items(
                    joi.number()
                )
            )
        }))
    });

    try {
        await joi.validate(validateObject, validateSchema);

    } catch(ex) {
        result.status = false;
        result.error = ex;
    }

    return result;
};

module.exports = {
    validateNewCinema,
};