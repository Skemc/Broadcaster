import Joi from '@hapi/joi';

class reportValidation {
   static validateReport (body) {
      const schema = Joi.object({
         title: Joi.string().required().error(new Error('Title of report is required and not allowed to empty')),
         type: Joi.string().valid('red-flag', 'intervention').required().error(new Error('Type of report must be a Red-flag or Intervention and not allowed to empty')),
         comment: Joi.string(),
         locationLat: Joi.string().required().error(new Error(' Location latitude of report is required and not allowed to empty')),
         locationLong: Joi.string().required().error(new Error('Location longitude of report is required and not allowed to empty')),
      });

      return schema.validate(body, { abortEarly: false});
   }
}

export default reportValidation;