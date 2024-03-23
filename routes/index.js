const router = require("express").Router();

const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");
const subCategoryRoutes = require("./subcategory.routes");
const colorRoutes = require("./atri-color.routes");
const sizeRouter = require("./atri-size.routes");
const productRouter = require("./porduct.routes");
const addtocartRouter = require("./addtocart.routes");
const orderRouter = require("./order.routes");
const shippingRouter = require("./shippingAdd.routes");
const paymentRouter = require("./paymentdetails.routes");
const newsletterRouter = require("./newsletter.routes");

router.use("/api/user", userRoutes);
router.use("/api/category", categoryRoutes);
router.use("/api/subcategory", subCategoryRoutes);
router.use("/api/color", colorRoutes);
router.use("/api/size", sizeRouter);
router.use("/api/product", productRouter);
router.use("/api/cart", addtocartRouter);
router.use("/api/order", orderRouter);
router.use("/api/shipping", shippingRouter);
router.use("/api/payment", paymentRouter);
router.use("/api/newsletter", newsletterRouter);

module.exports = router;