//! THIS IS THE ROOT OF THE SERVER //

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dontenv from "dotenv";
import corsOptions from "./config/corsOptions.js";

//! INITIALIZE SERVER APP //
const app = express();
dontenv.config();

//! PORT //
const PORT = process.env.PORT || 5000;

//! MIDDLEWARES //
app.use(cors());
app.use(express.json(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(cookieParser());

//! ROUTES //
// No matching routes
app.all("*", (req, res) => {
	res.status(404);
	res.send("404 Error. No matching routes found!");
});

//! SERVER START //
app.listen(PORT, () => {
	console.log(`Server started on PORT: ${PORT}`);
});
