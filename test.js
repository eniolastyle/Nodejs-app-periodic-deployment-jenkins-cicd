const request = require('supertest');
const { app, server } = require('./server.js');
const mongoose = require('mongoose');
const { expect } = require('chai');
const Todo = require('./models/todo.js');

describe('Todo API', () => {
  // Create sample data before running the tests
  before(async () => {
    await mongoose.connect(
      'mongodb+srv://goadmin:2JUjHAIk1ON46itZ@godatabase.pi7lxgz.mongodb.net/',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Clear existing data in the test database
    await Todo.deleteMany({});

    // Insert sample data into the test database
    await Todo.insertMany([{ text: 'Todo 1' }, { text: 'Todo 2' }]);
  });

  // Clean up the test database after running the tests
  after(async () => {
    // Remove all data from the test database
    await Todo.deleteMany({});
    // Disconnect from the test database
    await mongoose.connection.close();
    server.close();
  });

  // Test GET /api/todos
  describe('GET /api/todos', () => {
    it('should retrieve all todos', (done) => {
      request(app)
        .get('/api/todos')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          // Assertions
          expect(res.body.length).to.equal(2);
          expect(res.body[0].text).equal('Todo 1');
          expect(res.body[1].text).to.equal('Todo 2');

          done();
        });
    });
  });

  // Test POST /api/todos
  describe('POST /api/todos', () => {
    it('should create a new todo', (done) => {
      request(app)
        .post('/api/todos')
        .send({ text: 'New Todo' })
        .expect(201)
        .end(async (err, res) => {
          if (err) return done(err);

          // Assertions
          expect(res.body.text).to.equal('New Todo');

          // Check if the new todo exists in the database
          const todos = await Todo.find();
          expect(todos.length).to.equal(3);
          expect(todos[2].text).to.equal('New Todo');

          done();
        });
    });
  });

  // Test PUT /api/todos/:id
  describe('PUT /api/todos/:id', () => {
    it('should update a todo', async () => {
      // Get the first todo from the database
      const todos = await Todo.find();
      const todoId = todos[0]._id;

      const res = await request(app)
        .put(`/api/todos/${todoId}`)
        .send({ text: 'Updated Todo' });

      // Assertions
      expect(res.status).to.equal(200);
      expect(res.body.text).to.equal('Updated Todo');

      // Check if the todo is updated in the database
      const updatedTodo = await Todo.findById(todoId);
      expect(updatedTodo.text).to.equal('Updated Todo');
    });
  });

  // Test DELETE /api/todos/:id
  describe('DELETE /api/todos/:id', () => {
    it('should delete a todo', async () => {
      // Get the first todo from the database
      const todos = await Todo.find();
      const todoId = todos[0]._id;

      const res = await request(app).delete(`/api/todos/${todoId}`).expect(200);

      // Assertions
      expect(res.body.message).to.equal('Todo deleted');

      // Check if the todo is deleted from the database
      const deletedTodo = await Todo.findById(todoId);
      expect(deletedTodo).to.be.null;
    });
  });
});
