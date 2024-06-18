const middlewareControllers = require("../controller/middleware");
const userController = require("../controller/user");

const router = require("express").Router()

router.get("/getAll", middlewareControllers.verifyToken, userController.getAllUsers);
router.delete("/delete/:id", middlewareControllers.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = router