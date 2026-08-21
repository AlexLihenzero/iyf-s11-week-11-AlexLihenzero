// src/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
};

// Basic email validation
const isValidEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
};

// Register new user
const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                error: 'Username, email and password are required'
            });
        }

        // Validate username
        if (username.length < 3 || username.length > 30) {
            return res.status(400).json({
                error: 'Username must be between 3 and 30 characters'
            });
        }

        // Validate email
        if (!isValidEmail(email)) {
            return res.status(400).json({
                error: 'Please provide a valid email'
            });
        }

        // Validate password
        if (password.length < 6) {
            return res.status(400).json({
                error: 'Password must be at least 6 characters'
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                error: 'User with this email or username already exists'
            });
        }

        // Create user
        const user = new User({
            username,
            email,
            password
        });

        // Password is hashed by the User model's pre-save middleware
        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors)
                .map(e => e.message);

            return res.status(400).json({
                errors: messages
            });
        }

        next(error);
    }
};

// Login user
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required'
            });
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({
                error: 'Please provide a valid email'
            });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                error: 'Password must be at least 6 characters'
            });
        }

        // Find user and include password
        const user = await User.findOne({
            email: email.toLowerCase()
        }).select('+password');

        // Generic error - don't reveal whether email exists
        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        next(error);
    }
};

// Get current user
const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    getMe
};