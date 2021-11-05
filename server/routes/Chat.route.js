const Router = require('express').Router();

const Chat = require('../controllers/Chat.controller');

module.exports = {
  init: app => {
    // Route principale pour récupérer les NotifToUser d'un utilisateur
    Router.route('/')
      .get(({}, res) => {
        Chat.getChat()
          .then(chat=> {
            res.status(200).send(chat);

          })
          .catch(error => {
            res.status(500).send({ error: { code: 'Internal Server Error', message: error, status: 500 } });
          })
        ;
      })
    ;

    app.use('/chat', Router);
  }
};