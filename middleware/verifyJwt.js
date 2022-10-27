//! MIDDLEWARE TO VERIFY JWT TOKEN SENT FROM FRONTEND //

import jwt from "jsonwebtoken";

export const verifyJwt = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (!authHeader?.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Unauthorized!" });
	}

	const token = authHeader.split(" ")[1];

	jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
		if (err) {
			return res.status(403).json({ message: "Forbidden!" });
		}

		req.body.username = decoded.username;
		req.body.id = decoded.id;

		next();
	});
};
