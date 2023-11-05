const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/auth");
const {
    create,
    listIdeas,
    orderById,

} = require("../controllers/Idea");


router.post(
    "/idea/create/:userId",
    requireSignin,
    isAuth,
    create
);

router.param("userId", userById);


module.exports = router;
