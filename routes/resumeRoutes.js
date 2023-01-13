//! ALL ROUTES RELATED TO RESUMES //

//? All routes begin with '/resume'

import express from "express";
import {
	getResume,
	createResume,
	updateResume,
	deleteResume,
	getUserResumes,
} from "../controllers/resumeControllers.js";
import { verifyJwt } from "../middleware/verifyJwt.js";

const router = express.Router();

// Get a resume // public link
router.get("/:id", getResume);

router.use(verifyJwt);

// Update a resume
router.put("/:id", updateResume);

// Delete a resume
router.delete("/:id", deleteResume);

// Get a user's resumes
router.get("/user/:id", getUserResumes);

// Create a resume
router.post("/create", createResume);

export default router;
