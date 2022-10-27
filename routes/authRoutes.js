//! ALL ROUTES FOR AUTHENTICATION //

//? All routes start with '/auth'

import express from "express";
import { login, refresh, logout } from "../controllers/authControllers.js";

const router = express.Router();

// Login User
router.post("/login", login);

// Refresh Access Token
router.get("/refreshToken", refresh);

// Logout - Clear Cookies
router.post("/logout", logout);

export default router;
