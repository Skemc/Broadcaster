import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userValidations from '../helpers/UserValidation';
import users from '../models/usersModel';

class UserController {

    static signup (req,res) {
        
        const { error } = userValidations.validateSignup(req.body);
        if (error){
            return res.status(400).send({ status: 400, error: error.details[0].message });
        }

        const { firstName, lastName, userName, email, password, phoneNumber } = req.body;
        const isUserExist = users.find(user => user.email === email);

        if(isUserExist) {
            return res.status(409).send({ status: 409, error: "This user already exists"});
        }

        const hashPassword = bcrypt.hashSync(password, 10);
        const newUser = {
            id: users.length + 1,
            firstName,
            lastName,
            userName,
            email,
            passwords: hashPassword,
            phoneNumber
        }

        users.push(newUser);
        const {passwords, ...data} = newUser;
        return res.status(201).send({  status: 201, data });
    }

}

export default UserController