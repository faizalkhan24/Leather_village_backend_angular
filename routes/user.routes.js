const router = require("express").Router();
const userController = require("../controllers/user.controller")

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/checkuser/:id", userController.checkuser);
router.put("/update/:id", userController.update);

module.exports = router;