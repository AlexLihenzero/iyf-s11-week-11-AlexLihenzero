const express = require('express');
const postsRoutes = require('./routes/posts');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic test route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the CommunityHub API!'
    });
});

// Posts routes
app.use('/api/posts', postsRoutes);

module.exports = app;