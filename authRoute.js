const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
router.get("/", authMiddleware, (req, res) => {
    res.json({
        message: "Welcome to your profile",
        user: req.user
    });
});
router.post("/register",authController.register);
router.post("/login", authController.login);

module.exports = router;