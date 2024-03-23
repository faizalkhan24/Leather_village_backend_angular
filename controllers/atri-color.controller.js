const AtriColor = require("../models/atri-color.model");

const add = async (req, res) => {
    try {
        const isExist = await AtriColor.findOne({ label: req.body.label });
        // console.log(isExist);
        // return false;
        if (isExist) {
            res.status(409).send({
                success: false,
                message: "This Color is alredddady Created!!!",
            });
            return
        };
        const data = await AtriColor.create({
            label: req.body.label,
            value: req.body.value,
            colorHex: req.body.colorHex,
        })
        res.send({
            success: true,
            message: "Color Created",
            data: data
        });
    } catch (error) {
        console.log("Add Color Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};

const getAllColor = async (req, res)=>{
    try {
        const data = await AtriColor.find({});
        return res.status(200).send({
            success: true,
            message: "Color Fetched Succesfully",
            data: data
        });
    } catch (error) {
        console.log("GetAll Color Error ::>", error, "Error Message ::>", error.message);
        return res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};

const deleteColor = async (req, res)=>{
    
    try {
        const data = await AtriColor.deleteOne({_id : req.params.id})
        return res.status(200).send({
            success: true,
            message: "Color Deleted",
            data: data
        });

    } catch (error) {
        console.log("Delete Color Error ::>", error, "Error Message ::>", error.message);
        return res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};

module.exports = {
    add,
    getAllColor,
    deleteColor
}