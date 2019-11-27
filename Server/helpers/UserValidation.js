import Joi from "@hapi/joi";

class UserValidations {
   static validateSignup = (body) => {
      const schema = Joi.object({
         firstName: Joi.string().regex(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/).required().error(new Error('First name of user is required and not allowed to empty and must be only characters A-Z')),
         lastName: Joi.string().regex(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/).required().error(new Error('Second name of user is required and not allowed to empty and must be only characters A-Z')),
         userName: Joi.string().required().error(new Error('User name of user is required and not allowed to empty')),
         email: Joi.string().regex(/^\S+@[\w\-]+\.[A-Za-z ]{2,}$/).required().error(new Error('Email of user must be valid and is required and not allowed to empty')),
         password: Joi.string().regex(/^[A-Za-z0-9]{8,}/).required().error(new Error('Password must have an Uppercase, Lowercase and a number and not allowed to empty')),
         phoneNumber: Joi.string().required().error(new Error('Number of user is required and not allowed to empty')),
      });

      return schema.validate(body);
   }

   static validateSignin = (body) => {
     const schema = Joi.object({
        email: Joi.string().regex(/^\S+@[\w\-]+\.[A-Za-z ]{2,}$/).required().error(new Error('Email of user must be valid and is required and not allowed to empty')),
        password: Joi.string().regex(/^[A-Za-z0-9]{8,}/).required().error(new Error('Password must have an Uppercase, Lowercase and a number and not allowed to empty')),
    });                     

     return schema.validate(body);
  }
}

export default UserValidations;