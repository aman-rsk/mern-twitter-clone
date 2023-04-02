// Import Mongoose package.
import mongoose from 'mongoose';

// Define the user schema.
const UserSchema = new mongoose.Schema(
	{
		// Username of the user.
		username: {
			type: String,
			required: true,
			unique: true,
		},
		// Email address of the user.
		email: { type: String, required: true, unique: true },
		// Hashed password of the user.
		password: { type: String, required: true },
		// Profile bio of the user.
		profileProfile: { type: String },
		// Array of user IDs for followers of the user.
		followers: { type: Array, defaultValue: [] },
		// Array of user IDs for users that the user follows.
		following: { type: Array, defaultValue: [] },
		// Description of the user.
		description: { type: String },
		// Profile picture URL of the user.
		profilePicture: { type: String },
	},
	{ timestamps: true }
);

export default mongoose.model('User', UserSchema);
