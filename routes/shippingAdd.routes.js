const router = require("express").Router();
const shippingAddController = require("../controllers/shippingAdd.controller")


const auth = require("../middleware/auth.gaurd");


router.post("/add", shippingAddController.add);

module.exports = router;