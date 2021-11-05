const expressStatusMonitor = require('express-status-monitor');
const Datetime = require('./Date').datetime();
const Users = require('../controllers/Users.controller');
const Message = ('../controllers/Message.controller');
const Chat = require('../controllers/Chat.controller')




let io;

module.exports = {
  listen: (server, app) => {
    // Initialisation des sockets
    io = require('socket.io')(server, {
      cors: {
        origin: '*'
      }
    });

    // Force express à utiliser les websockets de socket.io et non les siens
    app.use(expressStatusMonitor({
      websocket: io,
      port: app.get('port')
    }));

    // Ecoute du socket 'connection' pour initialiser les sockets d'écoute
    io.on('connection', socket => {
      // Socket d'écoute pour enregistrer les adresses de socket, les identifiants de connection
      // et les identifiants des utilisateurs
      socket.on('connection', (username) => {
        const USER = {
          socketId: socket.id,
          username:username,
          lastUpdate:Datetime,
          connectionDate:Datetime,
        };
          Users.addUser(USER);
      
      });
      //message des utilisateurs
      socket.on('message', (message)=>{
        const MESSAGE= {
          message: message,
          date: Datetime,
          idChat: idchat,
          idUser: iduser 
        };
        Message.addMessage(MESSAGE)
      })

      //Chat
      socket.on('title',(title)=>{
        const CHAT={
          iduser:iduser,
          lastmessage:lastmessage,
          title:title
        };
        Chat.addChat(CHAT)

      } )
    });

    return io;
  },

  // Fonction générique pour envoyer des données par socket à un utilisateur spécifié
  send: (eventname,socketid, data) => {
     
      io.to(socketid).emit(eventname, data);
    
  }
};
