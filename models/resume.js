import mongoose from "mongoose";

// Resume Schema Definition
const resumeSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		name: {
			type: String,
			required: true,
		},
		position: {
			type: String,
			required: true,
		},
		share: {
			type: Boolean,
			required: true,
			default: true,
		},
		data: {
			type: [],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

// Resume Model Definition
const resumeModel = new mongoose.model("Resume", resumeSchema);

export default resumeModel;
