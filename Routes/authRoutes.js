import express from "express";
import * as authHandlers from "../Controllers/authController.js";
import * as authMiddleware from "../middleware/registerMiddleware.js";
const router = express.Router();
// router.post("/register", authHandlers.registerUser); //for testing purposes
router.post("/register", authMiddleware.checkUniqueEmail,authHandlers.registerUser);
router.post("/login", authMiddleware.checkEmailExists,authHandlers.loginUser);
router.get("/logout", authMiddleware.checkUserLoggedIn, authHandlers.logout);
router.get("/verify-email", authHandlers.verifyEmail);
router.post("/send-reset-password-link", authHandlers.sendResetPasswordLink); //send email to update pass
router.get("/update-password", authHandlers.verifyPasswordToken);
router.post("/update-password", authHandlers.updatePassword);
export default router;