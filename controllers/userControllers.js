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
export const updateUser = async (req, res) => {};

// DELETE A USER
export const deleteUser = async (req, res) => {};
