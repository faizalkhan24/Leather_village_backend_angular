const router = require("express").Router();
const addToWishlistController = require("../controllers/addtocart.controller")

router.post("/add", addToWishlistController.add);
router.get("/getAll", addToWishlistController.getAll);
router.delete("/delete/:id", addToWishlistController.deleteOne);
router.delete("/deleteall", addToWishlistController.deleteAll);

module.exports = router;