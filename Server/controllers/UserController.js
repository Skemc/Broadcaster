import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userValidations from '../helpers/UserValidation';
import queries from '../config/queries';
import executeQuery from "../config/connectDB";
import {users, userModel} from '../models/usersModel';

dotenv.config();

class UserController {

    static async signup(req, res) {
        try {
            const { error } = userValidations.validateSignup(req.body);
            if (error) {
                return res.status(400).send({ status: 400, error: error.message });
            }
            const isUserExist = await userModel.isUserExist(req.body);
            if (isUserExist) {
                return res.status(409).send({
                    status: 409,
                    message: "this email is already in use"
                });
            }
            const created = await userModel.signUp(req);
            const token = jwt.sign({
                id: created[0].id,
                email: created[0].email,
                isadmin: created[0].isAdmin
            }, process.env.secretKey);

            res.status(201).send({
                status: 201,
                message: "User created successfully",
                data: {token:token }
            });
        }
        catch (err) {
            return res.status(400).send({ status: 400, error: err.message });
        }
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
        });
    }
}


export default UserController;