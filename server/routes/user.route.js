const express = require('express');
const router = express.Router();
const signUp = require("../controllers/usersignup.controller");
const signIn = require("../controllers/usersignin.controller");

router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;