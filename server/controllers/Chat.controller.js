const ChatModel = ('../models/Chats.model');

module.exports = {
    addChat: chat => {
      ChatModel.create(chat, (error, chat) => {
        if (error) {
          console.error(error, chat);
          
        }
      });
    },
  
    getChats: () => new Promise((resolve, reject) => {
      ChatModel.find({}, (error, chats) => {
        if (error) {
          console.error(error);
          reject(error);
        }
  
        resolve(chats);
      });
    })
  };