const joi = require("joi");

const validatePendingPlaceData = async data => {
  const validateSchema = joi.object().keys({
    seanceId: joi
      .string()
      .min(24)
      .required(),
    x: joi.number().required(),
    y: joi.number().required()
  });

  let result = {
    status: true,
    error: null,
    data
  };

  try {
    await joi.validate(data, validateSchema);
  } catch (ex) {
    result.status = false;
    result.error = ex;
  }

  return result;
};

const validateSkipValue = async skip => {
  const result = {
    status: true,
    error: null,
    skip
  };

  try {
    await joi.validate(skip, joi.number().required());
  } catch (ex) {
    result.status = false;
    result.error = ex;
  }

  return result;
};

const validateMongoId = async id => {
  const result = {
    status: true,
    error: null,
    id
  };

  try {
    await joi.validate(
      id,
      joi
        .string()
        .min(24)
        .required()
    );
  } catch (ex) {
    result.status = false;
    result.error = ex;
  }

  return result;
};

const validateNewSeanceData = async data => {
  const result = {
    status: true,
    error: null,
    data
  };

  const validateSchema = joi.object().keys({
    cinema: joi
      .string()
      .min(24)
      .required(),
    film: joi
      .string()
      .min(24)
      .required(),
    date: joi.date().required(),
    roomNumber: joi.number().required()
  });

  try {
    await joi.validate(data, validateSchema);
  } catch (ex) {
    result.status = false;
    result.error = ex;
  }

  return result;
};

const validateSearchData = async data => {
  const result = {
    status: true,
    error: null,
    data
  };

  const validateSchema = joi.object().keys({
    filter: joi
      .string()
      .min(4)
      .valid("city", "cinema", "film_name", "date", "one_place_exist")
      .required(),
    text:
      data.filter !== "date" ? joi.string().required() : joi.date().required(),
    skip: joi.number().required()
  });

  try {
    await joi.validate(data, validateSchema);
  } catch (ex) {
    result.status = false;
    result.error = ex;
  }

  return result;
};

module.exports = {
  validatePendingPlaceData,
  validateSkipValue,
  validateMongoId,
  validateNewSeanceData,
  validateSearchData
};
