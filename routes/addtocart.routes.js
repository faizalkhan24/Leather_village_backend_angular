const router = require("express").Router();
const addToCartController = require("../controllers/addtocart.controller")

router.post("/add", addToCartController.add);
router.get("/getAll/:userId", addToCartController.getAll);
router.delete("/delete/:id", addToCartController.deleteOne);
router.delete("/deleteall", addToCartController.deleteAll);

module.exports = router;