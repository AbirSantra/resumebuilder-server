import mongoose, { Mongoose } from "mongoose";

// User Schema definition
const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

// User Model definition
const userModel = mongoose.model("User", userSchema);

export default userModel;
