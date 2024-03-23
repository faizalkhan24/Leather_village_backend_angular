const router = require("express").Router();
const categoryController = require("../controllers/category.controller")


const auth = require("../middleware/adminAuth.gaurd");

const multer  = require('multer');
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
  
  
  // router.post("/add",upload.array('uploaded_file', 5) , categoryController.add);

router.post("/add", auth ,upload.single('uploaded_file') , categoryController.add);
router.put("/updateimg/:id",auth , upload.single('uploaded_file') , categoryController.updateImg);
router.put("/update/:id",auth , categoryController.update);
router.put("/status/:id",auth , categoryController.changeStatus);
router.get("/get", categoryController.getAll);
router.get("/get/:id", categoryController.getOne);
router.delete("/delete/:id", auth, categoryController.deleteCat);

module.exports = router;