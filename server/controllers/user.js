// Importing necessary modules.
import { handleError } from '../error.js';
import User from '../models/User.js';
import Tweet from '../models/Tweet.js';

// Controller function to get user data.
export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};

// Controller function to update user data.
export const update = async (req, res, next) => {
	// Checking if the request is from the authorized user.
	if (req.params.id === req.user.id) {
		try {
			// Updating the user data.
			const updatedUser = await User.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{
					new: true,
				}
			);
			res.status(200).json(updatedUser);
		} catch (err) {
			next(err);
		}
	} else {
		// Returning an error if unauthorized access.
		return next(createError(403, 'Unauthorized access!'));
	}
};

// Controller function to delete user data.
export const deleteUser = async (req, res, next) => {
	// Check if the user id matches the id of the authenticated user.
	if (req.params.id === req.user.id) {
		try {
			// Find and delete the user.
			await User.findByIdAndDelete(req.params.id);
			// Remove all tweets of the deleted user.
			await Tweet.remove({ userId: req.params.id });

			// Send a success message.
			res.status(200).json('Deleted user!');
		} catch (err) {
			next(err);
		}
	} else {
		// Return an error if the user is not authorized.
		return next(handleError(403, 'Unauthorized access!'));
	}
};

// Controller function to follow a user.
export const follow = async (req, res, next) => {
	try {
		// Find the user to follow.
		const user = await User.findById(req.params.id);
		// Find the current user.
		const currentUser = await User.findById(req.body.id);

		// Check if the current user is already following the user.
		if (!user.followers.includes(req.body.id)) {
			// Add the current user to the followers of the user.
			await user.updateOne({
				$push: { followers: req.body.id },
			});

			// Add the user to the following list of the current user.
			await currentUser.updateOne({ $push: { following: req.params.id } });
		} else {
			// Send an error message if the current user is already following the user.
			res.status(403).json('You already follow this user!');
		}
		// Send a success message if the user is followed successfully.
		res.status(200).json('Following the user!');
	} catch (err) {
		next(err);
	}
};

// Controller function to unfollow a user.
export const unFollow = async (req, res, next) => {
	try {
		// Get the user being unfollowed.
		const user = await User.findById(req.params.id);
		// Get the current user.
		const currentUser = await User.findById(req.body.id);

		// Check if the current user is already following the user being unfollowed.
		if (currentUser.following.includes(req.params.id)) {
			// Remove the current user from the user being unfollowed's followers list.
			await user.updateOne({
				$pull: { followers: req.body.id },
			});

			// Remove the user being unfollowed from the current user's following list.
			await currentUser.updateOne({ $pull: { following: req.params.id } });
		} else {
			// If the current user is not following the user being unfollowed, return an error.
			res.status(403).json('You are not following this user!');
		}
		res.status(200).json('Unfollowing the user!');
	} catch (err) {
		next(err);
	}
};
