// Import Mongoose package.
import mongoose from 'mongoose';

// Create a new schema for tweets.
const TweetSchema = new mongoose.Schema(
	{
		// User ID who created the tweet.
		userId: {
			type: String,
			required: true,
		},
		// Tweet description (text content).
		description: {
			type: String,
			required: true,
			max: 280,
		},
		// Array of user IDs who liked the tweet.
		likes: {
			type: Array,
			defaultValue: [],
		},
	},
	// Set timestamps for createdAt and updatedAt.
	{ timestamps: true }
);

export default mongoose.model('Tweet', TweetSchema);
