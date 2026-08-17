const express = require('express');

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

module.exports = app;