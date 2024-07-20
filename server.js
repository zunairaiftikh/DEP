const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Set up SQLite database
const db = new sqlite3.Database('./mugtales.db');

// Create tables if they don't exist
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, price REAL, image TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY, productId INTEGER, quantity INTEGER)");
});

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API Endpoints
app.get('/api/products', (req, res) => {
    db.all("SELECT * FROM products", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ products: rows });
        }
    });
});

app.post('/api/cart', (req, res) => {
    const { productId, quantity } = req.body;
    db.run("INSERT INTO cart (productId, quantity) VALUES (?, ?)", [productId, quantity], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id: this.lastID });
        }
    });
});

app.get('/api/cart', (req, res) => {
    db.all("SELECT * FROM cart", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ cart: rows });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
