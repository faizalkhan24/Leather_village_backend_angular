const AddToWishlist = require("../models/addtowishlist.model");

const add = async (req, res)=>{
    try {
        const data = await AddToWishlist.create({
            productId : req.body.productId,
            userId : req.body.userId
        })
        res.status(200).send({
            success: true,
            message: "Product Added to Wishlist Successfully",
            data: data
        });
    } catch (error) {
        console.log("Add addTCart Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};

const getAll = async (req, res)=>{
    try {
        const data = await AddToWishlist.find({ userId : req.body.userId });
        res.status(200).send({
            success: true,
            message: "Wishlist Fetched Successfully",
            data: data
        });
    } catch (error) {
        console.log("Add addTCart Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};


const deleteOne = async (req,res)=>{
    try {
        const data = await AddToWishlist.deleteOne({ userId : req.params.id});
        res.status(200).send({
            success: true,
            message: "Product Deleted From Cart.",
            data: data
        });
    } catch (error) {
        console.log("deleteOne addToWishlist Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};

const deleteAll = async (req, res)=>{
    try {
        const data = await AddToWishlist.deleteMany({ userId : req.body.userId });
        res.status(200).send({
            success: true,
            message: "Cart is Empty Successfully",
            data: data
        });
    } catch (error) {
        console.log("deleteAll addToWishlist Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};


module.exports = {
    add,
    getAll,
    deleteOne,
    deleteAll
}