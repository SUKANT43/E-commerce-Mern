const userLoginModel = require('../model/userModel');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;
    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Get user from database (excluding password)
            req.user = await userLoginModel.findById(decoded.id).select('-password');
            console.log("hello")


            if (!req.user) {
                return res.status(401).json({ 
                    success: false,
                    msg: 'User not found - token invalid' 
                });
            }
            
            // Continue to next middleware
            next();
        } catch (error) {
            // Handle specific JWT errors
            let message = 'Not authorized';
            
            if (error.name === 'JsonWebTokenError') {
                message = 'Invalid token';
            } else if (error.name === 'TokenExpiredError') {
                message = 'Token expired';
            }
            
            return res.status(401).json({ 
                success: false,
                msg: message,
                error: error.message 
            });
        }
    }
    
    if (!token) {
        return res.status(401).json({ 
            success: false,
            msg: 'No token provided - authorization denied' 
        });
    }
};

module.exports = { protect };