const mongoose = require('mongoose');

const USER_SCHEMA = new mongoose.Schema({

  username: {
    required: true,
    type: String
  },

  socketId: {
    required: true,
    type: String
  },
  lastUpdate: {
    required: true,
    type: String
  },
  connectionDate: {
    required: true,
    type: String
  },
}, { collection: 'user' });

class UserClass {
  getId(){
    return this._id;
  }

  getDate() {
    return this.date;
  }

  getUsername() {
    return this.username;
  }

  getSocketId() {
    return this.socketId;
  }

}

USER_SCHEMA.pre('find', () => {
  console.log('user');
});

USER_SCHEMA.loadClass(UserClass);
module.exports = mongoose.model('User', USER_SCHEMA);