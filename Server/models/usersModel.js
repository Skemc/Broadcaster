import queries from '../config/queries';
import executeQuery from '../config/connectDB';
import bcrypt from 'bcrypt';
import { exists } from 'fs';

const users = [
    {
        id: 1,
        firstName : "eric",
        lastName : "skemc",
        userName : "skemc-eric",
        email : "eric8@gmail.com",
        password : "$2b$10$hjXgNwYIzx8Hxeg.silh3usMzPF.TGMV3lMY55LACDhv19TnrtrMW",
        phoneNumber : "0785824928",
        isAdmin: false
    },
    
    {
        id: 3,
        firstName : "eric",
        lastName : "skemc",
        userName : "skemc-eric",
        email : "eric6@gmail.com",
        password : "$2y$10$bfCLjcykPtlYcQThRvkkj.vWw.L0fhlEBhqNRuJ5rPalr3FKuqemy",
        phoneNumber : "0785824928",
        isAdmin: true
    }

]; 

class userModel {
    static async signUp(req) {
        const {
            firstName,
            lastName,
            userName,
            email,
            phoneNumber
        } = req.body;
        const password = bcrypt.hashSync(req.body.password, 10);
            const newUser = [
                firstName,
                lastName,
                userName,
                email,
                password,
                phoneNumber
            ];
        const createdUser = await executeQuery(queries[0].createUser, newUser);
        return createdUser;
    }

    static async isUserExist(body){
        let result = false;
        const exists = await executeQuery(queries[0].isUserExist, [body.email]);
        if(exists.length === 1){
            result = true;
        }
        return result;
    }

}

export {users,userModel};


