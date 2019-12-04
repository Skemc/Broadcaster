import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userValidations from '../helpers/UserValidation';
import queries from '../config/queries';
import executeQuery from "../config/connectDB";
import { userModel} from '../models/usersModel';

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
    static async signin(req, res) {
        try {
            const { error } = userValidations.validateSignin(req.body);
            if (error) {
                return res.status(400).send({ status: 400, error: error.message });
            }
            const { email, password } = req.body;
            const isUserExist = await executeQuery(queries[0].isUserExist, [email]);
            if (isUserExist.length === 0) {
                return res.status(401).send({
                    status: 401,
                    message: "User is not signed up yet"
                });
            } else {
                const isPassword = bcrypt.compareSync(password, isUserExist[0].password);
                if (isPassword) {
                    const token = jwt.sign({
                        id: isUserExist[0].id,
                        email: isUserExist[0].email,
                        isadmin: isUserExist[0].isAdmin
                    }, process.env.secretKey);
                    res.status(200).send({
                        status: 200,
                        message: "User is successfully logged in",
                        data: { token }
                    });
                }
                else return res.status(401).send({
                    status: 401,
                    message: "Incorrect password"
                });
            }

        } catch (error) {
            return res.status(400).send({ status: 400, error: error.details[0].message });

        }
    }

}


export default UserController;