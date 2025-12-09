import { User } from "../models/user.model.js";

export const toggleFavorite = async (req, res) => {
	try {
		const { id: favoriteUserId } = req.params; // The ID of the user to favorite
		const { _id: currentUserId } = req.user; // The ID of the logged-in user

		if (favoriteUserId === currentUserId.toString()) {
			return res.status(400).json({ message: "You cannot favorite yourself" });
		}

		const currentUser = await User.findById(currentUserId);
		const userToFavorite = await User.findById(favoriteUserId);

		if (!userToFavorite) {
			return res.status(404).json({ message: "User not found" });
		}

		// Check if the user is already a favorite
		const isFavorite = currentUser.favorites.includes(favoriteUserId);

		if (isFavorite) {
			// Remove from favorites
			await User.findByIdAndUpdate(currentUserId, {
				$pull: { favorites: favoriteUserId },
			});
			res.status(200).json({ message: "User removed from favorites" });
		} else {
			// Add to favorites
			await User.findByIdAndUpdate(currentUserId, {
				$push: { favorites: favoriteUserId },
			});
			res.status(200).json({ message: "User added to favorites" });
		}
	} catch (error) {
		console.log("Error in toggleFavorite controller: ", error);
		res.status(500).json({ message: "Internal server error" });
	}
};