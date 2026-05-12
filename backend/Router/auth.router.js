const express = require("express");
const {  signUp,verifyEmail,login,logout} = require("../Controllers/auth.controller");

const router = express.Router();

router.post("/signup", signUp);

router.get("/verify/:code",verifyEmail)

router.post("/login", login)

router.post("/logout", logout)

module.exports = router;