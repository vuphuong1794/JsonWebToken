const middlewareControllers = require("../controller/middleware");
const userController = require("../controller/user")
const router = require("express").Router()

///get all user
router.get("/getAll", middlewareControllers.verifyToken, userController.getAllUsers);

//delete user
router.delete("/delete/:id", middlewareControllers.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = router