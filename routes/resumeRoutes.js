//! ALL ROUTES RELATED TO RESUMES //

//? All routes begin with '/resume'

import express from "express";
import {
	getResume,
	createResume,
	updateResume,
	deleteResume,
} from "../controllers/resumeControllers.js";

const router = express.Router();

// Get a resume
router.get("/:id", getResume);

// Create a resume
router.post("/create", createResume);

// Update a resume
router.put("/:id", updateResume);

// Delete a resume
router.delete("/:id", deleteResume);

export default router;
