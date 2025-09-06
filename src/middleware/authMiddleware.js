const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin.js');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

      // --- NEW VALIDATION BLOCK ---
      // This is a runtime check and a type guard for the editor.
      // We explicitly check if the decoded payload is a valid object with an 'id'.
      if (typeof decodedPayload !== 'object' || !('id' in decodedPayload)) {
        // If not, the token is malformed.
        return res.status(401).json({ message: 'Not authorized, invalid token' });
      }

      // After this check, the editor knows decodedPayload is an object with an 'id'.
      req.admin = await Admin.findById(decodedPayload.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };

