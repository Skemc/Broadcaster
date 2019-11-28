import Joi from "@hapi/joi";

class UserValidations {
   static validateSignup (body) {
      const schema = Joi.object({
         firstName: Joi.string().required(),
         lastName: Joi.string().required(),
         userName: Joi.string().required(),
         email: Joi.string().regex(/^\S+@[\w-]+\.[A-Za-z ]{2,}$/).required(),
         password: Joi.string().regex(/^[A-Za-z0-9]{8,}/).required(),
         phoneNumber: Joi.string().required(),

      });

      return schema.validate(body, {abortEarly: false});
   }

   static validateSignin (body) {
     const schema = Joi.object({
        email: Joi.string().regex(/^\S+@[\w-]+\.[A-Za-z ]{2,}$/).required().error(new Error('Email of user must be valid and is required and not allowed to empty')),
        password: Joi.string().regex(/^[A-Za-z0-9]{8,}/).required().error(new Error('Password must have an Uppercase, Lowercase and a number and not allowed to empty')),
    });                     

     return schema.validate(body);
  }
}

export default UserValidations;