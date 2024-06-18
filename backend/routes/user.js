const userController = require("../controller/user");

const router = require("express").Router()

router.get("/getAll", userController.getAllUsers);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router