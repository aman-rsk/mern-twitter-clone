// Importing Tweet model, User model, and handleError function from error.js
import Tweet from '../models/Tweet.js';
import { handleError } from '../error.js';
import User from '../models/User.js';

// Creating a new tweet.
export const createTweet = async (req, res, next) => {
	// Creating a new Tweet object.
	const newTweet = new Tweet(req.body);
	try {
		// Saving the tweet to the database.
		const savedTweet = await newTweet.save();
		res.status(200).json(savedTweet);
	} catch (err) {
		handleError(500, err);
	}
};

// This function deletes a tweet with a specific id.
export const deleteTweet = async (req, res, next) => {
	try {
		const tweet = await Tweet.findById(req.params.id);

		// Check if the tweet's user id matches the current user's id.
		if (tweet.userId === req.body.id) {
			// Delete the tweet.
			await tweet.deleteOne();
			res.status(200).json('The tweet has been deleted!');
		} else {
			handleError(500, err);
		}
	} catch (err) {
		handleError(500, err);
	}
};

// This function allows the user to like or dislike a tweet with a specific id.
export const likeOrDislike = async (req, res, next) => {
	try {
		const tweet = await Tweet.findById(req.params.id);

		// Check if the user has already liked the tweet.
		if (!tweet.likes.includes(req.body.id)) {
			// Add the user id to the tweet's likes array.
			await tweet.updateOne({ $push: { likes: req.body.id } });
			res.status(200).json('You liked this tweet!');
		} else {
			// Remove the user id from the tweet's likes array.
			await tweet.updateOne({ $pull: { likes: req.body.id } });
			res.status(200).json('You disliked this tweet!');
		}
	} catch (err) {
		handleError(500, err);
	}
};

// Get all tweets of a user and his/her followers.
export const getAllTweets = async (req, res, next) => {
	try {
		// Find the current user.
		const currentUser = await User.findById(req.params.id);
		// Find tweets of the current user.
		const userTweets = await Tweet.find({ userId: currentUser._id });
		// Find tweets of the current user's followers.
		const followersTweets = await Promise.all(
			currentUser.following.map((followerId) => {
				return Tweet.find({ userId: followerId });
			})
		);

		// Return user's and followers' tweets.
		res.status(200).json(userTweets.concat(...followersTweets));
	} catch (err) {
		handleError(500, err);
	}
};

// Get tweets of a specific user.
export const getUserTweets = async (req, res, next) => {
	try {
		// Find tweets of the user with the provided user id.
		const userTweets = await Tweet.find({ userId: req.params.id }).sort({
			createAt: -1,
		});

		// Return the user's tweets.
		res.status(200).json(userTweets);
	} catch (err) {
		handleError(500, err);
	}
};

// Get tweets based on likes count.
export const getExploreTweets = async (req, res, next) => {
	try {
		// Find all tweets that have at least one like and sort them based on the number of likes in descending order.
		const getExploreTweets = await Tweet.find({
			likes: { $exists: true },
		}).sort({ likes: -1 });

		// Return the explore tweets.
		res.status(200).json(getExploreTweets);
	} catch (err) {
		handleError(500, err);
	}
};
