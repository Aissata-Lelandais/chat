const UsersModel = require('../models/Users.model');

module.exports = {
  addUser: user => {
    const sendSocket= require('../helpers/Socket').send;

    UsersModel.findOneAndUpdate({ username: user.username , socketId: user.socketId, lastUpdate: user.lastUpdate, connectionDate: user.connectionDate }, {new:true},(error, userCb) => {
      if (error) {
        console.log(error)
      }
      // console.log(userCb.getSocketId())
      // console.log(user.socketId)
      if (!userCb) {
        UsersModel.create(user, (error, userCb2) => {
          if (error) console.log(error)
          console.log(userCb2)
          console.log(userCb2.getSocketId())

          sendSocket("connected",userCb2.getSocketId(), userCb2.getId())

        })
      }else
      {sendSocket("connected",userCb.getSocketId(), userCb.getId())
    }
    });
  },


  getUsers: () => new Promise((resolve, reject) => {
    UsersModel.find({}, (error, users) => {
      if (error) {
        console.error(error);
        reject(error);
      }

      resolve(users);
    });
  })
};

