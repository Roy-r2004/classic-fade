import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
    // Extract token from the custom 'token' header
    const token = req.header('token');

    if (!token) {
        // Return error if the token is not provided
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token and decode it
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Add the decoded token data to req.user

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Return error if the token is invalid
        return res.status(400).json({ success: false, message: 'Invalid token.' });
    }
};

export default authUser;
