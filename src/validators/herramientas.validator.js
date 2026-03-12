const Joi = require("joi");

const createHerramientaSchema = Joi.object({
  numero_base: Joi.string().required(),
  figura: Joi.string().required(),
  estado: Joi.string().required(),

  localidad: Joi.string().allow("", null),
  direccion: Joi.string().allow("", null),
  negocio: Joi.string().allow("", null),
  cliente: Joi.string().allow("", null),
  cc: Joi.string().allow("", null),
  telefono: Joi.string().allow("", null),

});
module.exports = {
  createHerramientaSchema
};