const router = require("express").Router();

const productController = require("../controllers/product.controller");

const auth = require("../middleware/adminAuth.gaurd");

const multer  = require('multer');
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images/products/");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `product-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });

  const upload = multer({
    storage: multerStorage,
    // fileFilter: multerFilter,
  });

const cpUpload = upload.fields([
  { name: 'thumbnailPrimary', maxCount: 1 }, 
  { name: 'thumbnailSecondary', maxCount: 1 }, 
  { name: 'productImages', maxCount: 10 },
  { name: 'productImage1', maxCount: 1 },
  { name: 'productImage2', maxCount: 1 },
  { name: 'productImage3', maxCount: 1 },
  { name: 'productImage4', maxCount: 1 },
  { name: 'productImage5', maxCount: 1 },
  { name: 'productImage6', maxCount: 1 },
  { name: 'productImage7', maxCount: 1 },
  { name: 'productImage8', maxCount: 1 }
])


router.get("/get", productController.getAll);
router.get("/get/:limit/:skip", productController.get);
router.get("/get/:id", productController.getOne);
router.get("/getByCatagory/:id", productController.getByCategory);
router.get("/getBySubCatagory/:id", productController.getBySubCategory);
router.delete("/delete/:id", auth, productController.deleteOne);
router.post("/add", auth, cpUpload,productController.add);
router.delete("/deleteall", auth,productController.deleteAll);

module.exports = router;