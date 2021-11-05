const MessageModel = require('../models/Message.model');

module.exports = {
  addMessage: message => {
    const sendSocket= require('../helpers/Socket').send;

    MessageModel.findOne({ date: message.date, message:message.message, idchate: message.idchate, iduser: message.iduser }, {new:true},(error, messageCb) => {
      if (error) {
        console.log(error)
      }
       console.log(messageCb.getSocketId())
       console.log(message.socketId)
      if (!messageCb) {
        MessageModel.create(message, (error, messageCb) => {
          if (error) console.log(error)
          console.log(messageCb)
          console.log(messageCb.getSocketId())

          sendSocket("Envoyé",messageCb.getSocketId(), messageCb.getId())

        })
      }else
      {sendSocket("Envoyé",messageCb.getSocketId(), messageCb.getId())
    }
    });
  },
  getMessage: () => new Promise((resolve, reject) => {
    MessageModel.find({}, (error, message) => {
      if (error) {
        console.error(error);
        reject(error);
      }

      resolve(message);
    });
  })
};