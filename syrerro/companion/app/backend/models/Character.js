// models/Character.js
const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: String,
  class: String,
  level: Number,
  stats: {
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number
  }
});

module.exports = mongoose.model('Character', characterSchema);