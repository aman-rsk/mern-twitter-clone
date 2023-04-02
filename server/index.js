// Import required modules.
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// Import required routes.
import userRoutes from './routes/users.js';
import authRoutes from './routes/auths.js';
import tweetRoutes from './routes/tweets.js';

// Create Express app instance.
const app = express();

// Load environment variables from .env file.
dotenv.config();

// Connect to MongoDB database.
const connect = () => {
	mongoose.set('strictQuery', false);
	mongoose
		.connect(process.env.MONGO)
		.then(() => {
			console.log('Connected to MongoDB database!');
		})
		.catch((err) => {
			throw err;
		});
};

// Use middleware to parse cookies and JSON request bodies.
app.use(cookieParser());
app.use(express.json());

// Use routes.
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tweets', tweetRoutes);

// Start server and connect to database.
app.listen(4000, () => {
	connect();
	console.log('Listening on port 4000!');
});
