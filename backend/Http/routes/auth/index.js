const router = require("express").Router();

// all middlewares
const MulterRequest = require("../../middleware/MulterRequest");
const SignupRequest = require("../../middleware/auth/SignupRequest");
const EmailVerifyRequest = require("../../middleware/auth/EmailVerifyRequest");
const LoginRequest = require("../../middleware/auth/LoginRequest");
const ForgotPasswordRequest = require("../../middleware/auth/ForgotPasswordRequest");
const ResetPasswordRequest = require("../../middleware/auth/ResetPasswordRequest");

// all controllers
const AuthController = require("../../controllers/AuthController");
const UserController = require("../../controllers/UserController");

router.route("/sign-up").post(MulterRequest, SignupRequest, UserController.createUser);

router.route("/email-verification").post(EmailVerifyRequest, AuthController.emailVerify);

router.route("/login").post(LoginRequest, AuthController.loginUser);

router.route("/forgot-password").post(ForgotPasswordRequest, AuthController.forgotPassword);

router.route("/reset-password").post(ResetPasswordRequest, AuthController.resetPassword);

module.exports = router;
