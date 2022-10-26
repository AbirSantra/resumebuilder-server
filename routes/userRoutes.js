//! ALL ROUTES RELATED TO USERS //

//? All routes begin with '/user'

import express from "express";
import {
	getUser,
	registerUser,
	updateUser,
	deleteUser,
} from "../controllers/userControllers.js";

const router = express.Router();

// Get a User
router.get("/:id", getUser);

// Register a User
router.post("/register", registerUser);

// Update a User
router.patch("/:id", updateUser);

// Delete a User
router.delete("/:id", deleteUser);

export default router;
