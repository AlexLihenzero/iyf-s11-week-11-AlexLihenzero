const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

// Get all posts
router.get('/', postsController.getAllPosts);

// Get single post
router.get('/:id', postsController.getPostById);

// Create post
router.post('/', postsController.createPost);

// Update post
router.put('/:id', postsController.updatePost);

// Delete post
router.delete('/:id', postsController.deletePost);

// Like post
router.post('/:id/like', postsController.likePost);

module.exports = router;