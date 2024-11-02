import jwt from 'jsonwebtoken';

const authBarber = (req, res, next) => {
    // Extract token from the 'bToken' header
    const btoken = req.headers['btoken'];

    if (!btoken) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token and extract the payload
        const decoded = jwt.verify(btoken, process.env.JWT_SECRET);

        // Ensure that the decoded token contains barberId
        if (!decoded.barberId) {
            return res.status(400).json({ success: false, message: 'Invalid token, barberId is missing.' });
        }

        // Attach the barberId to the request body
        req.body.barberId = decoded.barberId;

        // Proceed to the next middleware
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Invalid token.' });
    }
};

export default authBarber;
