const express = require("express");
const router = express.Router();

const {
    signup,
    signin,
    signout,
    googleLogin,
    
} = require("../controllers/auth");

// import validators
const {
    userSignupValidator,
    userSigninValidator,


} = require('../validator/auth');

const { runValidation } = require('../validator/index');

router.post("/signup", userSignupValidator, signup);
router.post("/signin", userSigninValidator,signin);
router.get("/signout", signout);


// google
// router.post('/google-login', googleLogin);



module.exports = router;
