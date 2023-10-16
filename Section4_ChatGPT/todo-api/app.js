// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB (You'll need to have MongoDB running)
mongoose.connect('mongodb://localhost/todos', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create a Todo model using Mongoose
const Todo = mongoose.model('Todo', {
    text: String,
    completed: Boolean
});

//Todo lists
let todos = [
    { id: 1, task: "Learn Node.js", status: true },
    { id: 2, task: "Learn Node.js2", status: true },
    { id: 3, task: "Learn Node.js3", status: true }
];

// Middleware to parse JSON data
app.use(bodyParser.json());

// Define API routes

// Get all Todos
app.get('/todos', async (req, res) => {
    //const todos = await Todo.find();
    res.json(todos);
});

// Create a new Todo
app.post('/todos', async (req, res) => {
    const newTodo = new Todo({
        text: req.body.text,
        completed: false
    });
    await newTodo.save();
    res.json(newTodo);
});

// Update a Todo by ID
app.put('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const updates = { completed: req.body.completed };
    const todo = await Todo.findByIdAndUpdate(id, updates, { new: true });
    res.json(todo);
});

// Delete a Todo by ID
app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id;
    await Todo.findByIdAndRemove(id);
    res.sendStatus(200);
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
