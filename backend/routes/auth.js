const authController = require("../controller/auth");
const middlewareControllers = require("../controller/middleware");
const router = require("express").Router();

//register 
router.post("/register", authController.registerUser);

//login
router.post("/login", authController.loginUser);

//refresh
router.post("/refresh", authController.requestRefreshToken);

//logout
router.post("/logout", middlewareControllers.verifyToken, authController.userLogOut);

module.exports = router;