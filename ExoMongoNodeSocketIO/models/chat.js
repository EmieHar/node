const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }

});

// Hash le mot de passe avant l'enregistrement

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;