const joi = require("joi");

const validateLoginData = async data => {
  let result = {
    status: true,
    error: null,
    data
  };

  const validateSchema = joi.object().keys({
    email: joi
      .string()
      .email()
      .required(),
    password: joi
      .string()
      .min(5)
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
  });

  try {
    await joi.validate(data, validateSchema);
  } catch (ex) {
    result.status = false;
    result.error = ex;
  }

  return result;
};

const validateRegisterData = async data => {
  let result = {
    status: true,
    error: null,
    data
  };

  const validateSchema = joi.object().keys({
    name: joi
      .string()
      .min(3)
      .required(),
    email: joi
      .string()
      .email()
      .required(),
    password: joi
      .string()
      .min(5)
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
  });

  try {
    await joi.validate(data, validateSchema);
  } catch (ex) {
    result.status = false;
    result.error = ex;
  }

  if (data.role) {
    result.status = false;
    result.error = "Validate role error!";
  }

  return result;
};

module.exports = {
  validateLoginData,
  validateRegisterData
};
