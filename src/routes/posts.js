const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const commentsController = require('../controllers/commentsController');

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

// Comments
router.get('/:postId/comments', commentsController.getComments);
router.post('/:postId/comments', commentsController.createComment);
router.delete(
    '/:postId/comments/:commentId',
    commentsController.deleteComment
);

module.exports = router;