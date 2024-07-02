const express = require('express');
const consola = require('consola');
const cors = require('cors');
const mongoose = require('mongoose');
const formRoutes = require('./Routes/formRoutes');

const app = express();
consola.wrapAll();

app.use((req, res, next) => {
    consola.info({ message: `Method: ${req.method}, URL: ${req.url}, IP: ${req.ip}`, badge: true });
    next();
});

app.use(cors({
    credentials: true,
    origin: ["*"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/forms", formRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

const startServer = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.randomid.mongodb.net/formTest?retryWrites=true&w=majority&appName=Cluster0', {
        });
        app.listen(8000);
        consola.success({ message: `Server started on http://localhost:8000`, badge: true });
    } catch (error) {
        consola.error({ message: `Error starting server: ${error}`, badge: true });
    }
};

startServer();
