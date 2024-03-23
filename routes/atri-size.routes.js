const router = require("express").Router();
const auth = require("../middleware/adminAuth.gaurd");
const sizeController = require("../controllers/atri-size.controller")

router.post("/add", sizeController.add, auth);
router.get("/getAll", sizeController.getAll)
router.delete("/delete/:id", sizeController.deleteSize, auth);

module.exports = router;