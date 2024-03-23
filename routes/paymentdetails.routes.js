const router = require("express").Router();
const paymentController = require("../controllers/paymentdetails.controller")


const auth = require("../middleware/auth.gaurd");


router.post("/create", auth, paymentController.add);

module.exports = router;