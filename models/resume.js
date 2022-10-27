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
			header: {
				firstname: { type: String, required: true },
				middlename: { type: String, required: true },
				lastname: { type: String, required: true },
				profession: { type: String, required: true },
				city: { type: String, required: true },
				country: { type: String, required: true },
				pincode: { type: Number, required: true },
				phone: { type: Number, required: true },
				email: { type: String, required: true },
				linkedin: { type: String, required: true },
				website: { type: String, required: true },
			},
			experience: [
				{
					employer: { type: String, required: true },
					position: { type: String, required: true },
					location: { type: String, required: true },
					startdate: {
						month: { type: String, required: true },
						year: { type: Number, required: true },
					},
					enddate: {
						month: { type: String, required: true },
						year: { type: Number, required: true },
					},
				},
			],
			education: [
				{
					institute: { type: String, required: true },
					degree: { type: String, required: true },
					field: { type: String, required: true },
					startdate: {
						month: { type: String, required: true },
						year: { type: Number, required: true },
					},
					enddate: {
						month: { type: String, required: true },
						year: { type: Number, required: true },
					},
				},
			],
			skills: [String],
			projects: [
				{
					name: { type: String, required: true },
					tools: [String],
					url: { type: String, required: true },
					description: { type: String, required: true },
					startdate: {
						month: { type: String, required: true },
						year: { type: Number, required: true },
					},
					enddate: {
						month: { type: String, required: true },
						year: { type: Number, required: true },
					},
				},
			],
			roles: [
				{
					rolename: { type: String, required: true },
					organization: { type: String, required: true },
					description: { type: String, required: true },
				},
			],
			certifications: [
				{
					certificationname: { type: String, required: true },
					organization: { type: String, required: true },
					date: { type: String, required: true },
					url: { type: String, required: true },
				},
			],
			awards: [String],
			extra: [
				{
					title: { type: String, required: true },
					description: { type: String, required: true },
				},
			],
		},
	},
	{
		timestamps: true,
	}
);

// Resume Model Definition
const resumeModel = mongoose.model("Resume", resumeSchema);

export default resumeModel;
