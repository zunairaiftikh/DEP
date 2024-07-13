const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to SQLite database
const db = new sqlite3.Database('database.sqlite', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create a table for blog posts
db.run(`CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT
)`);

// REST API routes

// Create a new blog post
app.post('/blogs', (req, res) => {
    const { title, content } = req.body;
    db.run(`INSERT INTO blogs (title, content) VALUES (?, ?)`, [title, content], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ id: this.lastID, title, content });
    });
});

// Get all blog posts
app.get('/blogs', (req, res) => {
    db.all(`SELECT * FROM blogs`, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Get a single blog post
app.get('/blogs/:id', (req, res) => {
    const { id } = req.params;
    db.get(`SELECT * FROM blogs WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(row);
    });
});

// Update a blog post
app.put('/blogs/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    db.run(`UPDATE blogs SET title = ?, content = ? WHERE id = ?`, [title, content, id], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ id, title, content });
    });
});

// Delete a blog post
app.delete('/blogs/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM blogs WHERE id = ?`, id, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Deleted successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
