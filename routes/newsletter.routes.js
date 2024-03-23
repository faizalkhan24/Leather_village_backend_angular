const router = require("express").Router();
const newsletterController = require("../controllers/newsletter.controller")



router.post("/subscribe",  newsletterController.add);
router.get("/getall", newsletterController.getAll);

module.exports = router;