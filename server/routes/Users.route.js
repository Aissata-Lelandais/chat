const Router = require('express').Router();
const  resolve  = require('path/posix');
const  addUser  = require('../controllers/Users.controller');
const Users = require('../controllers/Users.controller');
const UserModel = require('../models/User.model');

module.exports = {
  init:app=>{
    addUser:(idUser,res)=>
    new Promise((resolve,reject)=> {
      UsersModel.find({ _id:{$ne:idUser}},(error,user)=>{
        res.status(200).send(user);
        if(error){
          console.error(error);
          reject(error);
        }
        resolve(user);
      });
    })
    }
    }
