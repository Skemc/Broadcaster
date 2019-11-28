import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userValidations from '../helpers/UserValidation';
import users from '../models/usersModel';

dotenv.config();

class UserController {

    static signup(req, res) {
        const { error } = userValidations.validateSignup(req.body);
        if (error) {
            const valError = error.details.map( (e) => e.message);
            return res.status(400).send({ status: 400, error: valError.join(",").replace(/"/g, '')});
        }
        const { firstName, lastName, userName, email, phoneNumber } = req.body;
        const isUserExist = users.find(user => user.email === email);
        if (isUserExist) {
            return res.status(409).send({ status: 409, error: "This user already exists" });
        }
        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        const newUser = {
            id: users.length + 1,
            firstName,
            lastName,
            userName,
            email,
            password: hashPassword,
            phoneNumber
        };        
        users.push(newUser);
        const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.secretKey);
        const { password, ...data } = newUser;
        data.token = token;
        return res.status(201).send({
            status: 201, message: "User created successfully ",
            data
        });
    }

    static signin(req, res) {
        const { error } = userValidations.validateSignin(req.body);
        if (error) {
            return res.status(400).send({ status: 400, error: error.message });
        }
        const isUserExist = users.find(user => user.email === req.body.email);
        if (!isUserExist) {
            return res.status(401).send({
                status: 401,
                message: "user dont exist"

            });
        }
        const isPassword = bcrypt.compareSync(req.body.password, isUserExist.password);
        if (!isPassword) {
            return res.status(401).send({
                status: 401,
                message: "Incorrect password"
            });
        }
        const token = jwt.sign({
            id: isUserExist.id,
            email: isUserExist.email,
            isadmin: isUserExist.isAdmin
        }, process.env.secretKey);
        return res.status(200).send({
            status: 200,
            message: 'User logged in successfully',
            token
        })
      
        });
    }
}

export default UserController;