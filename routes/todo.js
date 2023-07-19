const express = require('express');
const router = express.Router();

// Todo model
const Todo = require('../models/todo');

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error('Error retrieving todos:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    const todo = new Todo({
      text,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { text } = req.body;
      const todo = await Todo.findByIdAndUpdate(id, { text }, { new: true });
      res.json(todo);
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ message: 'Server error' });
    }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
