const router = require("express").Router();
const auth = require("../middleware/adminAuth.gaurd");
const subCategoryController = require("../controllers/subCategory.controller")

const multer  = require('multer')
// const upload = multer({ dest: './public/data/uploads/categories' })

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images/");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `category-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });

  const upload = multer({
    storage: multerStorage,
    // fileFilter: multerFilter,
  });
  
  
router.post("/add", auth,upload.single('subCat_Img') , subCategoryController.add);
router.put("/updateimg/:id", auth, upload.single('subCat_Img'),subCategoryController.updateImg);
router.put("/update/:id", auth,subCategoryController.update);
router.put("/status/:id",auth , subCategoryController.changeStatus);
router.get("/get/", subCategoryController.getAll);
router.get("/get/:id", subCategoryController.getOne);
router.get("/getbycategory/:id", subCategoryController.getByCategory);
router.delete("/delete/:id", auth,subCategoryController.deleteSubCat);

module.exports = router;