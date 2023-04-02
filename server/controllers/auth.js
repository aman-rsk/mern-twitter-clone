// Importing User model, bcryptjs, jwt and handleError from their respective files.
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { handleError } from '../error.js';

// Defining the signup function with async.
export const signup = async (req, res, next) => {
	try {
		// Generating a salt for the password.
		const salt = bcrypt.genSaltSync(10);
		// Hashing the password.
		const hash = bcrypt.hashSync(req.body.password, salt);
		// Creating a new user object.
		const newUser = new User({ ...req.body, password: hash });

		// Saving the new user to the database.
		await newUser.save();

		// Creating a JWT token.
		const token = jwt.sign({ id: newUser._id }, process.env.JWT);

		// Removing password field from the newUser object and sending other fields in the response.
		const { password, ...othersData } = newUser._doc;

		// Sending the token and user data in the response.
		res
			.cookie('access_token', token, {
				httpOnly: true,
			})
			.status(200)
			.json(othersData);
	} catch (err) {
		// Passing the error to the next middleware.
		next(err);
	}
};

// Function to sign in user.
export const signin = async (req, res, next) => {
	try {
		// Find user by username.
		const user = await User.findOne({ username: req.body.username });

		// If user not found, send 404 error.
		if (!user) return next(handleError(404, 'User not found!'));

		// Compare the password entered by user with the password in the database.
		const isCorrect = await bcrypt.compare(req.body.password, user.password);

		// If password is incorrect, send 400 error.
		if (!isCorrect) return next(handleError(400, 'Incorrect password!'));

		// Sign and send a JWT token to the client.
		const token = jwt.sign({ id: user._id }, process.env.JWT);

		// Send only the user data excluding password to the client.
		const { password, ...othersData } = user._doc;

		res
			.cookie('access_token', token, { httpOnly: true })
			.status(200)
			.json(othersData);
	} catch (err) {
		next(err);
	}
};
