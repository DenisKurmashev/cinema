const jwt = require("jsonwebtoken");
const joi = require("joi");

const User = require("../models/user");
const config = require("../config.json");
const errors = require("../helpers/errors");

const {
  validateLoginData,
  validateRegisterData
} = require("../services/profile");

const login = async ctx => {
  const { status, error, data } = await validateLoginData(ctx.request.body);

  if (!status) {
    ctx.status = errors.wrongCredentials.status;
    ctx.body = error.details;
    return;
  }

  const { email, password } = data;

  const user = await User.findOne({ email }).select(
    "name email role created password"
  );

  if (!user || !(await user.verify(password))) {
    ctx.status = errors.wrongCredentials.status;
    ctx.body = errors.wrongCredentials;
    return;
  }

  let userObject = {
    id: user._id,
    name: user.name,
    email: user.email,
    created: user.created,
    role: user.role
  };

  ctx.status = 200;
  ctx.body = {
    user: userObject,
    token: "bearer " + jwt.sign({ id: user._id }, config.jwt)
  };
};

const register = async ctx => {
  const { status, error, data } = await validateRegisterData(ctx.request.body);

  if (!status) {
    ctx.status = errors.wrongCredentials.status;
    ctx.body = error.details;
    return;
  }

  let user;

  try {
    user = new User(data);
    await user.save();
  } catch (ex) {
    console.log(ex);
    ctx.status = errors.wrongCredentials.status;
    ctx.body = ex;
    return;
  }

  const userObject = {
    id: user._id,
    name: user.name,
    email: user.email,
    created: user.created,
    role: user.role
  };

  ctx.status = 201;
  ctx.body = {
    user: userObject,
    token: "bearer " + jwt.sign({ id: user._id }, config.jwt)
  };
};

module.exports = {
  login,
  register
};
