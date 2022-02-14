const joi = require("joi");

const id = joi.string().length(24).required();
const title = joi.string().min(3).max(30).required();
const price = joi.number().min(1).required();
const image = joi.string().uri().required();

const itemSchemas = {
  id,
  title,
  price,
  image,

  create: {
    body: joi.object({
      title,
      price,
      image,
    }),
  },

  update: {
    body: joi.object({
      title,
      price,
      image,
    }),
  },
};

module.exports = itemSchemas;
