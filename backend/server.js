const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://mongo:27017/tododb", { useNewUrlParser: true, useUnifiedTopology: true });

const TodoSchema = new mongoose.Schema({ text: String, done: Boolean });
const Todo = mongoose.model("Todo", TodoSchema);

// Routes
app.get("/todos", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post("/todos", async (req, res) => {
    const todo = new Todo({ text: req.body.text, done: false });
    await todo.save();
    res.json(todo);
});

app.listen(5000, () => console.log("Backend running on port 5000"));

