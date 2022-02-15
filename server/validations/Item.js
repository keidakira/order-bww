const joi = require("joi");

const id = joi.string().length(24).required();
const title = joi.string().min(3).max(50).required();
const price = joi.number().min(1).required();
const image = joi.string().uri().required();
const category = joi.string().length(24).required();

const itemSchemas = {
  id,
  title,
  price,
  image,
  category,

  create: {
    body: joi.object({
      title,
      price,
      image,
      category,
    }),
  },

  update: {
    body: joi.object({
      title,
      price,
      image,
      category,
    }),
  },
};

module.exports = itemSchemas;
