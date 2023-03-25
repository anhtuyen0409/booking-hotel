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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try{
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        }catch(e){
            reject(e);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: userId},
                raw: true,
            })

            if(user){
                resolve(user)
            }
            else{
                resolve({})
            }
        }catch(e){
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: data.id}
            })
            if(user){
                user.fullname = data.fullname;
                user.address = data.address;
                user.phone = data.phone;

                await user.save();

                let allUser = await db.User.findAll();
                resolve(allUser);
            }
            else{
                resolve();
            }
        }catch(e){
            reject(e);
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async(resolve, reject) =>{
        try{
            let user = await db.User.findOne({
                where: {id: userId}
            })
            if(user){
                await user.destroy();
            }
            resolve();
        }catch(e){
            reject(e);
        }
    })
}

module.exports = {
    createUser: createUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}