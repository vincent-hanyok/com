// routes/characters.js
import express from 'express';
import Character from '../models/Character.js';
const router = express.Router();

// Create a new character
router.post('/', async (req, res) => {
  const character = new Character(req.body);
  await character.save();
  res.status(201).send(character);
});

// Get all characters
router.get('/', async (_, res) => {
  const characters = await Character.find();
  res.send(characters);
});

// Get a character by ID
router.get('/:id', async (req, res) => {
  const character = await Character.findById(req.params.id);
  res.send(character);
});

// Update a character
router.put('/:id', async (req, res) => {
  const character = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(character);
});

// Delete a character
router.delete('/:id', async (req, res) => {
  await Character.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;