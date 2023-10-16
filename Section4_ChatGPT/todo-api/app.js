const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB (You'll need to have MongoDB running)
mongoose.connect('mongodb://localhost/todos', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create a Todo model
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

// Middleware to parse JSON
app.use(bodyParser.json());

// Routes
app.get('/todos', async (req, res) => {
    //const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const newTodo = new Todo({
        text: req.body.text,
        completed: false
    });
    await newTodo.save();
    res.json(newTodo);
});

app.put('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const updates = { completed: req.body.completed };
    const todo = await Todo.findByIdAndUpdate(id, updates, { new: true });
    res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id;
    await Todo.findByIdAndRemove(id);
    res.sendStatus(200);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
