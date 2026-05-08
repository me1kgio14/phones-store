const express = require("express");
const {  signUp,verifyEmail,login} = require("../Controllers/auth.controller");

const router = express.Router();

router.post("/signup", signUp);

router.get("/verify/:code",verifyEmail)

router.post("/login", login)
module.exports = router;