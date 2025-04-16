const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');  // JWT token should be passed in the Authorization header

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'Sanjaisuga@43');
    req.user = decoded;  // Attach the user data to the request object
    next();  // Proceed to the next middleware/route handler
  } catch (err) {
    return res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
