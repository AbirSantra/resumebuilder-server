//! ALL CONTROLLERS FOR USER //

import bcrypt from "bcrypt";
import mongoose from "mongoose";
import userModel from "../models/user.js";
import resumeModel from "../models/resume.js";

// GET A USER
export const getUser = async (req, res) => {
	const userId = req.params.id;

	try {
		const user = await userModel.findById(userId).select("-password").lean();

		if (!user) {
			return res.status(404).json({ message: "Target user not found!" });
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// CREATE/REGISTER A USER
export const registerUser = async (req, res) => {
	const { username, email, password, firstname, lastname } = req.body;

	if (!username || !email || !password || !firstname || !lastname) {
		return res.status(400).json({ message: "All fields are required!" });
	}

	try {
		const exisitingUsername = await userModel.findOne({ username }).lean();

		if (exisitingUsername) {
			return res.status(409).json({ message: "User already exists!" });
		}

		const existingEmail = await userModel.findOne({ email }).lean();
		if (existingEmail) {
			return res
				.status(409)
				.json({ message: "Email already registered with another account!" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new userModel({
			username,
			email,
			password: hashedPassword,
			firstname,
			lastname,
		});

		const newUser = await user.save();

		if (newUser) {
			res.status(200).json({ message: `New user ${username} registered!` });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// UPDATE A USER
export const updateUser = async (req, res) => {
	const userId = req.params.id;

	const { currentUserId, ...userDetails } = req.body;

	if (userId !== currentUserId) {
		return res
			.status(403)
			.json({ message: "Forbidden! You are unauthorized." });
	}

	try {
		const targetUser = await userModel.findById(userId).lean();

		if (!targetUser) {
			return res.status(404).json({ message: "User not found!" });
		}

		if (req.body.username) {
			const exisitingUsername = await userModel
				.findOne({ username: req.body.username })
				.lean();

			if (exisitingUsername) {
				if (exisitingUsername?._id?.toString() !== currentUserId) {
					return res.status(409).json({ message: "Username already taken!" });
				}
			}
		}

		if (req.body.email) {
			const existingEmail = await userModel
				.findOne({ email: req.body.email })
				.lean();

			if (existingEmail?._id?.toString() !== currentUserId) {
				return res
					.status(409)
					.json({ message: "Email is already registered!" });
			}
		}

		if (req.body.password) {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			req.body.password = hashedPassword;
		}

		const updatedUser = await userModel.findByIdAndUpdate(
			userId,
			{ ...userDetails, password: req.body.password },
			{
				new: true,
			}
		);

		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// DELETE A USER
export const deleteUser = async (req, res) => {
	const userId = req.params.id;

	const { currentUserId } = req.body;

	if (userId !== currentUserId) {
		return res
			.status(403)
			.json({ message: "Forbidden! You are unauthorized." });
	}

	try {
		const targetUser = await userModel.findById(userId);

		if (!targetUser) {
			return res.status(404).json({ message: "User not found!" });
		}

		const targetUsername = targetUser.username;

		await userModel.findByIdAndDelete(userId);

		res
			.status(200)
			.json({ message: `User ${targetUsername} successfully deleted!` });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
