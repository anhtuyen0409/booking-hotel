import db from '../models/index';
import CRUDService from '../services/CRUDService'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createUser(req.body);
    console.log(message);
    return res.send('post crud from server');
}

let displayGetCRUD = async(req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs',{
        dataTable: data
    });
}

let getEditCRUD = async(req, res) => {
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render('editCRUD.ejs', {
            user: userData
        });
    }
    
    return res.send("not found user!");
}

let putCRUD = async(req, res) => {
    let data = req.body;
    let allUser = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs',{
        dataTable: allUser
    });
}

let deleteCRUD = async(req, res) => {
    let id = req.query.id;
    if(id){
        await CRUDService.deleteUserById(id);
        return res.send('delete success!');
    }
    return res.send('user not found!');
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}