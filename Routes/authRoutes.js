import express from "express";
import * as authHandlers from "../Controllers/authController.js";
import * as authMiddleware from "../middleware/registerMiddleware.js";
const router = express.Router();
router.post("/register", authMiddleware.checkUniqueEmail,authHandlers.registerUser);
export default router;