const Router = require('express').Router();
const  resolve  = require('path/posix');
const MessageModel = require('../models/Message.model');

module.exports = {
  init:app=>{
    addMessage:(idUser,res)=>
    new Promise((resolve,reject)=> {
      MessageModel.send({ _id:{$ne:idUser}},(error,message)=>{
        res.status(200).send(message);
        if(error){

          console.error(error);
          reject(error);
        }
        resolve(message);
      });
    })
    }
    }