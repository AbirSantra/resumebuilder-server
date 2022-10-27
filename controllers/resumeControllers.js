//! ALL CONTROLLERS FOR RESUMES //

import mongoose from "mongoose";
import userModel from "../models/user.js";
import resumeModel from "../models/resume.js";

// GET A RESUME
export const getResume = async (req, res) => {
	const resumeId = req.params.id;

	try {
		const resume = await resumeModel.findById(resumeId).populate("user").exec();

		if (!resume) {
			return res.status(404).json({ message: "Resume not found!" });
		}

		res.status(200).json(resume);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// CREATE A RESUME
export const createResume = async (req, res) => {
	const { ...resumeDetails } = req.body;

	try {
		const resume = new resumeModel(resumeDetails);

		const newResume = await resume.save();

		if (newResume) {
			res
				.status(200)
				.json({ message: `New resume ${req.body.name} created successfully!` });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// UPDATE RESUME
export const updateResume = async (req, res) => {
	const resumeId = req.params.id;

	const { ...resumeDetails } = req.body;

	try {
		const existingResume = await resumeModel.findById(resumeId);

		if (!existingResume) {
			return res.status(404).json({ message: "Resume not found!" });
		}

		const updatedResume = await resumeModel.findByIdAndUpdate(
			resumeId,
			resumeDetails,
			{ new: true }
		);

		res.status(200).json(updatedResume);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// DELETE RESUME
export const deleteResume = async (req, res) => {
	const resumeId = req.params.id;

	const { currentUserId } = req.body;

	try {
		const existingResume = await resumeModel.findById(resumeId);

		if (!existingResume) {
			return res.status(404).json({ message: "Resume not found!" });
		}

		if (existingResume.user.toString() !== currentUserId) {
			return res
				.status(403)
				.json({ message: "Forbidden! You are unauthorized." });
		}

		const resumeName = existingResume.name;

		await resumeModel.findByIdAndDelete(resumeId);

		res
			.status(200)
			.json({ message: `Resume "${resumeName}" was successfully deleted!` });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
