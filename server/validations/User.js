const joi = require("joi");

const id = joi.string().length(24).required();
const name = joi.string().min(3).max(30).required();
const nickname = joi.string().min(3).max(30).required();
const email = joi.string().email().required();
const password = joi.string().min(6).max(30).required();

const userSchemas = {
  id,
  name,
  nickname,
  email,
  password,

  login: {
    body: joi.object({
      email,
      password,
    }),
  },

  create: {
    body: joi.object({
      name,
      nickname,
      email,
      password,
    }),
  },

  update: {
    body: joi.object({
      name,
      nickname,
      email,
      password,
    }),
  },
};

module.exports = userSchemas;
