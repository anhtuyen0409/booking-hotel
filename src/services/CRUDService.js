import db from '../models/index'
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let createUser = async (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                fullname: data.fullname,
                address: data.address,
                phone: data.phone,
                roleId: 'user'
            });

            resolve('create new user success!');
        }catch(e){
            reject(e);
        }
    })
    
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }catch(e){
            reject(e);
        }
    })
}

module.exports = {
    createUser: createUser
}