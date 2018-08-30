const joi = require("joi");
const { deepCopy } = require("../util/util");

const validateNewOrder = async data => {
  let validateObject = deepCopy(data);

  try {
    validateObject.additional = JSON.parse(data.additional);
  } catch (ex) {
    console.log(ex);
    delete validateObject.additional;
  }

  let result = {
    status: true,
    error: null,
    data: validateObject
  };

  const validateSchema = joi.object().keys({
    session: joi
      .string()
      .min(24)
      .required(),
    additional: joi
      .array()
      .items(
        joi.object().keys({
          additional: joi.string().min(24),
          count: joi.number()
        })
      )
      .required()
  });

  try {
    await joi.validate(validateObject, validateSchema);
  } catch (ex) {
    result.status = false;
    result.error = ex;
  }

  return result;
};

module.exports = {
  validateNewOrder
};
