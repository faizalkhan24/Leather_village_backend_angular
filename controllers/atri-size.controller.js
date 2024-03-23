const AtriSize = require("../models/atri-size.model");

const add = async (req, res) => {
    try {
        const isExist = await AtriSize.findOne({ label: req.body.label });
        if (isExist) {
            res.status(409).send({
                success: false,
                message: "This Size is already Created!!!",
            });
            return
        };
        const data = await AtriSize.create({
            label: req.body.label,
            value: req.body.value,
            price: req.body.price
        })
        res.send({
            success: true,
            message: "Size Created",
            data: data
        });
    } catch (error) {
        console.log("Add Size Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};

const getAll = async (req,res)=> {
    try {
        const data = await AtriSize.find({});
        res.status(200).send({
            success: true,
            message: "Size fetched successfully.",
            data: data
        });
    } catch (error) {
        console.log("Getall Size Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};

const deleteSize = async (req, res)=>{
    try {
        const data = await AtriSize.deleteOne({_id : req.params.id})
        res.status(200).send({
            success: true,
            message: "Size Deleted",
            data: data
        });
    } catch (error) {
        console.log("Delete Size Error ::>", error, "Error Message ::>", error.message);
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
    deleteSize
}