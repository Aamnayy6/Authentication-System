import express from "express";
const router = express.Router();
import * as mfaHandler from "../Controllers/mfaController.js";
router.post("/generate", mfaHandler.generateOTP);
router.post("/verify-setup", mfaHandler.verifyOTP);
router.post("/validate", mfaHandler.validateOTP);

export default router;