import Joi from "@hapi/joi";

class UserValidations {
   static validateSignup (body) {
      const schema = Joi.object({
         firstName: Joi.string().regex(/^[a-zA-Z]{2,}$/).min(3).required().error(new Error('First name of user is required, not numeric and not allowed to be empty')),
         lastName: Joi.string().min(3).regex(/^[a-zA-Z]{2,}$/).required().error(new Error('Second name of user is required, not numeric and not allowed to be empty')),
         userName: Joi.string().min(3).required().error(new Error('User name of user is required and not allowed to be empty')),
         email: Joi.string().regex(/^\S+@[\w-]+\.[A-Za-z ]{2,}$/).required().error(new Error('Email of user must be valid and is required and not allowed to be empty')),
         password: Joi.string().regex(/^[A-Za-z0-9]{8,}/).required().error(new Error('Password must have an Uppercase, Lowercase and a number and not allowed to be empty')),
         phoneNumber: Joi.string().min(8).required().error(new Error('Number of user is required and not allowed to be empty')),

      });

      return schema.validate(body, {abortEarly: false});
   }

   static validateSignin (body) {
     const schema = Joi.object({
        email: Joi.string().regex(/^\S+@[\w-]+\.[A-Za-z ]{2,}$/).required().error(new Error('Email of user must be valid and is required and not allowed to be empty')),
        password: Joi.string().required().error(new Error('Password is not allowed to be empty')),
    });                     

     return schema.validate(body);
  }
}

export default UserValidations;