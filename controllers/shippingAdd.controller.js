const ShippinggAdd = require("../models/shippingAdd.model");
const Order = require("../models/order.model");

const add = async (req, res)=>{
    try {
        const data = await ShippinggAdd.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            country : req.body.country,
            company : req.body.company,
            pin : req.body.pin,
            state : req.body.state,
            city : req.body.city,
            address : req.body.address,
            appartment : req.body.appartment,
            phone : req.body.phone,
            userId : req.body.userId,
            orderId : req.body.orderId
        })
        let date = await Order.findOneAndUpdate({ _id: req.body.orderId }, { orderShippingAddress : data._id})
        console.log(date);
        res.status(200).send({
            success: true,
            message: "ShippinggAdd Created Successfully",
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


module.exports = {
    add
}