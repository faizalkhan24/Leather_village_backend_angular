const router = require("express").Router();
const auth = require("../middleware/adminAuth.gaurd");
const colorController = require("../controllers/atri-color.controller")

router.post("/add", colorController.add, auth);
router.get("/getAll", colorController.getAllColor);
router.delete("/delete/:id", colorController.deleteColor, auth);

module.exports = router;