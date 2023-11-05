const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin, signout, read} = require("../controllers/auth");
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
router.get(
    "/ideas/:userId",
    // requireSignin,
    // isAuth,
    read
);


router.param("userId", userById);


module.exports = router;
