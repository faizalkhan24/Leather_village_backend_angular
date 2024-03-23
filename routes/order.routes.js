const router = require("express").Router();
const orderController = require("../controllers/order.controller")


const auth = require("../middleware/auth.gaurd");


router.post("/create", auth , orderController.add);
router.get("/get/:id", orderController.getOne);
router.get("/getall", orderController.getAll);

module.exports = router;