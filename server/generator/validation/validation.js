const Joi = require('joi');

module.exports  = Joi.object({
  latlng: Joi.object({
    lat: Joi.number().min(-70).max(80).required(),
    lng: Joi.number().min(-150).max(200).required(),
  }),
  message: Joi.string().max(80).required(),
  uniqueId: Joi.string().alphanum(),
})

