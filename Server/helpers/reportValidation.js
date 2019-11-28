import Joi from '@hapi/joi';

class reportValidation {
   static validateReport (body) {
      const schema = Joi.object({
         title: Joi.string().required(),
         type: Joi.string().valid('red-flag', 'intervention').required(),
         comment: Joi.string().required(),
         locationLat: Joi.string().required(),
         locationLong: Joi.string().required(),
      });

      return schema.validate(body, { abortEarly: false});
   }
}

export default reportValidation;