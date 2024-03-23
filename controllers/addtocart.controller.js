const AddToCart = require("../models/addtocart.model");

const add = async (req, res) => {
  try {
    const data = await AddToCart.create({
      // productId : req.body.productId,
      products: req.body.products,
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Product Added to Cart Successfully",
      data: data,
    });
  } catch (error) {
    console.log(
      "Add addTCart Error ::>",
      error,
      "Error Message ::>",
      error.message
    );
    res.status(400).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getAll = async (req, res) => {
  try {
    let userId = req?.params?.userId;
    if (userId == "null") {
      res.status(200).send({
        success: true,
        message: "No item in cart",
        data: [],
      });
    } else if (userId != "null") {
      const data = await AddToCart.find({ userId: userId }).populate(
        "products.productId"
      );
      res.status(200).send({
        success: true,
        message: "Cart Fetched Successfully",
        data: data,
      });
    }
  } catch (error) {
    console.log(
      "getAll addTCart Error ::>",
      error,
      "Error Message ::>",
      error.message
    );
    res.status(400).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const deleteOne = async (req, res) => {
  try {
    const data = await AddToCart.deleteOne({ _id: req.params.id });
    res.status(200).send({
      success: true,
      message: "Product Deleted From Cart.",
      data: data,
    });
  } catch (error) {
    console.log(
      "deleteOne addTCart Error ::>",
      error,
      "Error Message ::>",
      error.message
    );
    res.status(400).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const deleteAll = async (req, res) => {
  try {
    const data = await AddToCart.deleteMany({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Cart is Empty Successfully",
      data: data,
    });
  } catch (error) {
    console.log(
      "deleteAll addTCart Error ::>",
      error,
      "Error Message ::>",
      error.message
    );
    res.status(400).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  add,
  getAll,
  deleteOne,
  deleteAll,
};
