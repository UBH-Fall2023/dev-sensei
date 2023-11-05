const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin, signout, read} = require("../controllers/auth");
const { userById } = require("../controllers/auth");
const {
    create,

    orderById,

} = require("../controllers/idea");
const {ideaById} = require("../controllers/idea");


router.post("/idea/create/:userId", create);
router.get("/ideas/:userId", read);
router.get("/idea", ideaById);


router.param("userId", userById);


module.exports = router;
