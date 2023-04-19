const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

  idUser: {
    type: String,
    required: true
  },

  nom:{
      type: String,
      required: true
  },

  prenom:{
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    required: true
  }
});
// Hash le mot de passe avant l'enregistrement

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;