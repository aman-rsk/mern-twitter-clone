// Importing required modules.
import jwt from 'jsonwebtoken';
import { handleError } from './error.js';

// Middleware function to verify token.
export const verifyToken = (req, res, next) => {
	// Extracting token from cookies.
	const token = req.cookies.access_token;

	// If token is not found.
	if (!token) return next(handleError(401, 'You are not authenticated'));

	// Verifying the token.
	jwt.verify(token, process.env.JWT, (err, user) => {
		// If token is invalid.
		if (err) return next(createError(403, 'Token is invalid'));

		// If token is valid, save the user object to the request object.
		req.user = user;
		next();
	});
};
