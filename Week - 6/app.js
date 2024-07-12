const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// EJS
app.set('view engine', 'ejs');

// Item Schema
const itemSchema = new mongoose.Schema({
    name: String,
    description: String
});

const Item = mongoose.model('Item', itemSchema);

// Routes
app.get('/', async (req, res) => {
    const items = await Item.find({});
    res.render('index', { title: 'Home', items });
});

app.get('/items/new', (req, res) => {
    res.render('new', { title: 'Create New Item' });
});

app.post('/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.redirect('/');
});

app.get('/items/:id', async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render('show', { title: item.name, item });
});

app.get('/items/:id/edit', async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render('edit', { title: 'Edit Item', item });
});

app.post('/items/:id', async (req, res) => {
    await Item.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/items/${req.params.id}`);
});

app.post('/items/:id/delete', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
