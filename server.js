const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todosRouter = require('./routes/todo');
require('dotenv').config();
//const connectionStr = 'mongodb+srv://yusufolatuji53:LEi65TxnW3yLTprz@memories.wtf14jp.mongodb.net/test';
const connectionStr = 'mongodb+srv://goadmin:2JUjHAIk1ON46itZ@godatabase.pi7lxgz.mongodb.net/'
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todosRouter);

// Connect to MongoDB
mongoose.connect(connectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});

module.exports = { app, server }
