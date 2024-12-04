// models/Character.js
import mongoose from 'mongoose';

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

export default mongoose.model('Character', characterSchema);