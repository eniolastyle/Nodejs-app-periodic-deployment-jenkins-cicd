var express = require('express');
var app = express();
var request = require('supertest');
var mongoose = require('mongoose');
var Todo = require('./models/todo.js');
var router = require('./routes/todo.js');

// Use the router for the '/todos' endpoint
app.use('/todos', router);

// Connect to a test database
before(function (done) {
  // Increase timeout to 5000ms

  var mongoDB = 'mongodb+srv://yusufolatuji53:LEi65TxnW3yLTprz@memories.wtf14jp.mongodb.net/test';
  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
      console.error('Error connecting to test database:', err);
      done(err);
    } else {
      done();
    }
  });
});

// Clear the test database after each test
afterEach(function (done) {
  Todo.deleteMany({}, function (err) {
    if (err) {
      console.error('Error clearing test database:', err);
      done(err);
    } else {
      done();
    }
  });
});

// Close the database connection after all tests are done
after(function (done) {
  mongoose.connection.close(function (err) {
    if (err) {
      console.error('Error closing test database connection:', err);
      done(err);
    } else {
      done();
    }
  });
});

describe('Todo API', function () {
  describe('GET /todos', function () {
    it('should retrieve all todos', function (done) {
      // Create some sample todos in the test database
      var sampleTodos = [
        { text: 'Todo 1' },
        { text: 'Todo 2' },
      ];
      Todo.create(sampleTodos, function (err) {
        if (err) return done(err);
        // Make a GET request to the /todos endpoint
        request(app)
          .get('/todos')
          .expect(200)
          .expect(function (res) {
            if (res.body.length !== 2) {
              throw new Error('Incorrect number of todos');
            }
            if (res.body[0].text !== 'Todo 1' || res.body[1].text !== 'Todo 2') {
              throw new Error('Incorrect todo data');
            }
          })
          .end(done);
      });
    });
  });

  describe('POST /todos', function () {
    it('should create a new todo', function (done) {
      // Make a POST request to the /todos endpoint with a new todo
      request(app)
        .post('/todos')
        .send({ text: 'New Todo' })
        .expect(201)
        .expect(function (res) {
          if (res.body.text !== 'New Todo') {
            throw new Error('Incorrect todo data');
          }
        })
        .end(function (err) {
          if (err) return done(err);
          // Check if the todo is saved in the test database
          Todo.find({}, function (err, todos) {
            if (err) return done(err);
            if (todos.length !== 1 || todos[0].text !== 'New Todo') {
              return done(new Error('Todo not saved in database'));
            }
            done();
          });
        });
    });
  });

  describe('PUT /todos/:id', function () {
    it('should update a todo', function (done) {
      // Create a sample todo in the test database
      Todo.create({ text: 'Sample Todo' }, function (err, todo) {
        if (err) return done(err);
        // Make a PUT request to update the todo's text
        request(app)
          .put('/todos/' + todo._id)
          .send({ text: 'Updated Todo' })
          .expect(200)
          .expect(function (res) {
            if (res.body.text !== 'Updated Todo') {
              throw new Error('Incorrect todo data');
            }
          })
          .end(function (err) {
            if (err) return done(err);
            // Check if the todo is updated in the test database
            Todo.findById(todo._id, function (err, updatedTodo) {
              if (err) return done(err);
              if (!updatedTodo || updatedTodo.text !== 'Updated Todo') {
                return done(new Error('Todo not updated in database'));
              }
              done();
            });
          });
      });
    });
  });

  describe('DELETE /todos/:id', function () {
    it('should delete a todo', function (done) {
      // Create a sample todo in the test database
      Todo.create({ text: 'Sample Todo' }, function (err, todo) {
        if (err) return done(err);
        // Make a DELETE request to delete the todo
        request(app)
          .delete('/todos/' + todo._id)
          .expect(200)
          .expect(function (res) {
            if (res.body.message !== 'Todo deleted') {
              throw new Error('Incorrect response message');
            }
          })
          .end(function (err) {
            if (err) return done(err);
            // Check if the todo is deleted from the test database
            Todo.findById(todo._id, function (err, deletedTodo) {
              if (err) return done(err);
              if (deletedTodo) {
                return done(new Error('Todo not deleted from database'));
              }
              done();
            });
          });
      });
    });
  });
});
