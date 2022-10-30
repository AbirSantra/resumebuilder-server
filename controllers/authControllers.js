//! ALL CONTROLLERS FOR AUTHENTICATION //

import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// LOGIN USER
export const login = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Username and Password is required!" });
	}

	try {
		const user = await userModel.findOne({ username });

		if (!user) {
			return res.status(404).json({ message: "User not found!" });
		}

		const passwordValidity = await bcrypt.compare(password, user.password);

		// console.log(passwordValidity);

		if (!passwordValidity) {
			return res.status(401).json({ message: "Wrong Password!" });
		}

		const accessToken = jwt.sign(
			{
				username: user.username,
				id: user._id,
			},
			process.env.ACCESS_SECRET,
			{ expiresIn: "15m" }
		);

		const refreshToken = jwt.sign(
			{
				id: user._id,
			},
			process.env.REFRESH_SECRET,
			{ expiresIn: "1d" }
		);

		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "None",
			maxAge: 24 * 60 * 60 * 1000,
		});

		res.status(200).json({
			user,
			accessToken,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// REFRESH ACCESS TOKEN
export const refresh = (req, res) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) {
		return res.status(401).json({ message: "JWT Cookie not available" });
	}

	const refreshToken = cookies.jwt;

	jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
		if (err) {
			return res.status(403).json({ message: "Token Expired!" });
		}

		const user = await userModel.findById(decoded.id);

		if (!user) {
			return res.status(401).json({ message: "Unauthorized!" });
		}

		const accessToken = jwt.sign(
			{
				username: user.username,
				id: user._id,
			},
			process.env.ACCESS_SECRET,
			{ expiresIn: "15m" }
		);

		res.status(200).json({ user, accessToken });
	});
};

// LOGOUT - CLEAR COOKIES
export const logout = async (req, res) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) {
		return res.status(200).json({ message: "No cookies to clear" });
	}

	res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });

	res.status(200).json({ message: "Cookies found and cleared!" });
};
