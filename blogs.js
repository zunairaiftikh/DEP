// routes/blogs.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// INDEX ROUTE
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.render('index', { blogs: blogs });
  } catch (err) {
    res.redirect('/');
  }
});

// NEW ROUTE
router.get('/new', (req, res) => {
  res.render('new');
});

// CREATE ROUTE
router.post('/', async (req, res) => {
  const newBlog = {
    title: req.body.title,
    image: req.body.image,
    body: req.body.body
  };
  try {
    await Blog.create(newBlog);
    res.redirect('/blogs');
  } catch (err) {
    res.render('new');
  }
});

// SHOW ROUTE
router.get('/:id', async (req, res) => {
  try {
    const foundBlog = await Blog.findById(req.params.id);
    res.render('show', { blog: foundBlog });
  } catch (err) {
    res.redirect('/blogs');
  }
});

// EDIT ROUTE
router.get('/:id/edit', async (req, res) => {
  try {
    const foundBlog = await Blog.findById(req.params.id);
    res.render('edit', { blog: foundBlog });
  } catch (err) {
    res.redirect('/blogs');
  }
});

// UPDATE ROUTE
router.put('/:id', async (req, res) => {
  const updatedBlog = {
    title: req.body.title,
    image: req.body.image,
    body: req.body.body
  };
  try {
    await Blog.findByIdAndUpdate(req.params.id, updatedBlog);
    res.redirect(`/blogs/${req.params.id}`);
  } catch (err) {
    res.redirect('/blogs');
  }
});

// DELETE ROUTE
router.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
    res.redirect('/blogs');
  } catch (err) {
    res.redirect('/blogs');
  }
});

module.exports = router;
