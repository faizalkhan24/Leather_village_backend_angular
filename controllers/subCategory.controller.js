const SubCategory = require("../models/subcategory.model");
const fs = require('fs');
const path = 'public/images/';


const add = async (req, res) => {
    try {
        let isExist = await SubCategory.findOne({ name: req.body.name });
        if (isExist) {
            res.status(409).send({
                success: false,
                message: "This Sub Category is already Created!!!",
            });
            return
        };
        console.log(req.file, req.body)
        let bodydata = req.body;
        let data = await SubCategory.create({
            thumbnail: req.file.filename,
            name: bodydata.name,
            category: bodydata.category,
            categoryName: bodydata.categoryName,
            slug: bodydata.slug
        });


        res.status(200).send({
            success: true,
            message: "SubCategory Created Successfully",
            data: data
        });
    } catch (error) {
        console.log("Add SubCategory Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};

const update = async (req, res) => {
    try {
        let data = {
            name: req.body.name,
            slug: req.body.slug,
            category: req.body.category,
            // thumbnail: req.body.thumbnail
        };

        const updateSCat = await SubCategory.findOneAndUpdate({ _id: req.params.id }, data);
        res.status(200).send({
            success: true,
            message: "SubCategory Updated Successfully",
            data: updateSCat
        });

    } catch (error) {
        console.log("Update SubCategory  Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
}

const updateImg = async (req, res) => {
    try {
        let data = {
            name: req.body.name,
            slug: req.body.slug,
            category: req.body.category,
            thumbnail:  req.file.filename
        };

        const subCat = await SubCategory.findOne({_id : req.params.id});
        fs.unlink(path + subCat.thumbnail, (err) => {
            if (err) {
                return console.log('File Deleted Error ::>', err)
            }
            // console.log(  path+subCategory.thumbnail ,' file deleted')
        })

        const updateSCat = await SubCategory.findOneAndUpdate({ _id: req.params.id }, data);
        res.status(200).send({
            success: true,
            message: "SubCategory Updated Successfully",
            data: updateSCat
        });

    } catch (error) {
        console.log("Update SubCategory  Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
}

const changeStatus = async (req, res) => {
    try {
        let bodydata = req.body;
        let data = {
            status: bodydata.status,
        };
        const updatedCat = await SubCategory.findOneAndUpdate({ _id: req.params.id }, data);
        res.status(200).send({
            success: true,
            message: "SubCategory Status Updated Successfully",
            data: updatedCat
        });

    } catch (error) {
        console.log("Update SubCategory Status Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: 'update sub cat ::>  ' + error.message,
            data: null
        });
    }
};

const getAll = async (req, res) => {
    try {
        const subCategories = await SubCategory.find({}).populate({ path: 'category', select: 'name' });
        res.status(200).send({
            success: true,
            message: "SubCategory Fetched Successfully",
            data: subCategories
        });

    } catch (error) {
        console.log("Getall SubCategory  Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    };
};

const getOne = async (req, res) => {
    try {
        const subCategories = await SubCategory.find({ _id: req.params.id }).populate({ path: 'category', select: 'name' });

        res.status(200).send({
            success: true,
            message: "SubCategory Fetched Successfully",
            data: subCategories
        });

    } catch (error) {
        console.log("Getall SubCategory  Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    };
};

const getByCategory = async (req, res) => {
    try {
        const subCategories = await SubCategory.find({ category: req.params.id }).populate({ path: 'category', select: 'name' });

        res.status(200).send({
            success: true,
            message: "Sub Category Fetched Successfully",
            data: subCategories
        });
    } catch (error) {
        console.log("Get SubCategory by Category Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};

const deleteSubCat = async (req, res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id);
        const subCategories = await SubCategory.deleteOne({ _id: req.params.id })
        fs.unlink(path + subCategory.thumbnail, (err) => {
            if (err) {
                return console.log('File Deleted Error ::>', err)
            }
            // console.log(  path+subCategory.thumbnail ,' file deleted')
        })
        res.status(200).send({
            success: true,
            message: "SubCategory Fetched Successfully",
            data: subCategories
        });
    } catch (error) {
        console.log("Delete SubCategory  Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};


module.exports = {
    add,
    update,
    updateImg,
    changeStatus,
    getAll,
    getOne,
    getByCategory,
    deleteSubCat
}