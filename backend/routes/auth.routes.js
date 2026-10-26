const router = require("express").Router()
const { registerUser, signinWithEmailAndPAssword, signinWithOTP, signinWithGoogle, verifyOTP } = require("../controllers/auth.controller")
router
    .post("/register", registerUser)
    .post("/signin-email-pass", signinWithEmailAndPAssword)
    .post("/signin-otp", signinWithOTP)
    .post("/signin-google", signinWithGoogle)
    .post("/verify-otp", verifyOTP)

module.exports = router
