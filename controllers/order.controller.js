const Order = require("../models/order.model");

const add = async (req, res) => {
    try {

        const data = await Order.create({
            userId : req.body.userId,
            products: req.body.products
  
        })
        res.status(200).send({
            success: true,
            message: "Order Created Successfully",
            data: data
        });
    } catch (error) {
        console.log("Add Order Error ::>", error, "Error Message ::>", error.message);
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

        let data = await Order.find({ _id: req.params.id }).populate("products.productId")

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
            message: "Order Fetched Successfully",
            data: finalData
        });
    } catch (error) {
        console.log("Get One Order Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
}



const getAll = async (req, res) => {
    try {

        


        let query = {}
        console.log(req.query);
        if(req.query.pay) 
            query.isPaid = req.query.pay;
        let finalData = []

        let data = await Order.find(query).populate("products.productId").populate("userId").populate("orderShippingAddress")

        for (let i = 0; i < data.length; i++) {
            let totalPrice = 0
            let totalDiscount = 0
            let totalshippingPrice = 0
            let totalSalePrice = 0;
            // const el = data[i];
            for (let index = 0; index < data[i].products.length; index++) {
                const element = data[i].products[index];
                
                totalSalePrice += (element.salePrice * element.quantity);
                totalPrice += (element.price * element.quantity);
                totalDiscount += ((element.price - element.salePrice) * element.quantity);
                totalshippingPrice += (element.shippingCost * element.quantity);
    
            }
            finalData.push({
               ...data[i],
               totalPrice: totalPrice,
               totalDiscount: totalDiscount,
               totalSalePrice: totalSalePrice,
               totalshippingPrice: totalshippingPrice,
   
           })
        }



 res.status(200).send({
            success: true,
            message: "Order Fetched Successfully",
            data: data
        });
    } catch (error) {
        console.log("Get One Order Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
}

module.exports = {
    add,
    getOne,
    getAll
}