const PaymentDetail = require("../models/paymentdetails.model");
const Order = require("../models/order.model");

const add = async (req, res) => {
  try {
    console.log("req.body.products", req.body.products);

    const data = await PaymentDetail.create({
      orderId: req.body.orderId,
      transcationId: req.body.transcationId,
      orderDetail: req.body.orderDetail,
      status: req.body.status,      
      totalshippingPrice: req.body.totalshippingPrice,      
      totalPrice: req.body.totalPrice,      
      totalDiscount: req.body.totalDiscount,      
      totalSalePrice: req.body.totalSalePrice   
    })
    await Order.findOneAndUpdate({ _id: req.body.orderId }, { isPaid: true, isPaid: data._id })
    res.status(200).send({
      success: true,
      message: "PaymentDetail Created Successfully",
      data: data
    });
  } catch (error) {
    console.log("Add PaymentDetail Error ::>", error, "Error Message ::>", error.message);
    res.status(400).send({
      success: false,
      message: error.message,
      data: null
    });
  }
}

const getOne = async (req, res) => {
  try {

    let totalPrice = 0
    let totalDiscount = 0
    let totalshippingPrice = 0
    let totalSalePrice = 0;

    let data = await PaymentDetail.find({ _id: req.params.id }).populate("products.productId")

    for (let index = 0; index < data[0].products.length; index++) {
      const element = data[0].products[index];
      console.log("saleprice", element.salePrice, totalSalePrice);
      console.log("price", element.price, totalPrice);
      console.log("discount", (element.price - element.salePrice), totalDiscount);
      console.log("element.shippingCost", element.shippingCost), totalshippingPrice;
      totalSalePrice += (element.salePrice * element.quantity);
      totalPrice += (element.price * element.quantity);
      totalDiscount += ((element.price - element.salePrice) * element.quantity);
      totalshippingPrice += (element.shippingCost * element.quantity);

    }
    let finalData = [{
      ...data,
      totalPrice: totalPrice,
      totalDiscount: totalDiscount,
      totalSalePrice: totalSalePrice,
      totalshippingPrice: totalshippingPrice,

    }]



    console.log(finalData);
    res.status(200).send({
      success: true,
      message: "PaymentDetail Fetched Successfully",
      data: finalData
    });
  } catch (error) {
    console.log("Get One PaymentDetail Error ::>", error, "Error Message ::>", error.message);
    res.status(400).send({
      success: false,
      message: error.message,
      data: null
    });
  }
}

const getAll = async (req, res) => {
  try {

    let data = await PaymentDetail.find({})

    res.status(200).send({
      success: true,
      message: "PaymentDetail Fetched Successfully",
      data: data
    });
  } catch (error) {
    console.log("Get One PaymentDetail Error ::>", error, "Error Message ::>", error.message);
    res.status(400).send({
      success: false,
      message: error.message,
      data: null
    });
  }
}

module.exports = {
  add
}