const mongoose = require('mongoose');

const MESSAGE_SCHEMA = new mongoose.Schema({
  id:{
    required: true,
    type: string
  },

  
  message: {
    required: true,
    type: String
  },

 idChat:{
     required: true,
     type: string
 },
 idUser:{
    required: true,
    type: string
}
}, { collection: 'message' });

class MessageClass {
  getId () {
    return this._id;
  }

  getMessage () {
    return this.message ;
  }

  getIdChat () {
    return this.idChat ;
  }
  getIdUser () {
    return this.idUser ;
  }
}

MESSAGE_SCHEMA.pre('find', () => {
  console.log('Message');
});

MESSAGE_SCHEMA.loadClass(MessageClass);
module.exports = mongoose.model('Message', MESSAGE_SCHEMA);