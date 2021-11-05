const mongoose = require('mongoose');

const CHAT_SCHEMA = new mongoose.Schema({

  idUser: {
    required: true,
    type:string
  },

 lastMessage:{
     required: true,
     type: string
 },
 title:{
    required: true,
    type: string
}
}, { collection: 'message' });

class ChatsClass {
  
  getUserId () {
    return this.idUser;
  }
  getLastMessage () {
    return this.LastMessage;
  }

  getTitle () {
    return this.title ;
  }
}

CHAT_SCHEMA.pre('find', () => {
  console.log('chat')
});

CHAT_SCHEMA.loadClass(ChatsClass);
module.exports = mongoose.model('Chats', CHAT_SCHEMA);