const Category = require("../models/category.model");
const SubCategory = require("../models/subcategory.model");

const fs = require('fs');


const multer = require('multer')
const path = 'public/images/';
const upload = multer({ dest: 'public/images' });


const add = async (req, res) => {
    try {
        let isExist = await Category.findOne({ name: req.body.name });
        if (isExist) {
            res.status(409).send({
                success: false,
                message: "This Category is already Created!!!",
            });
            return
        };
        console.log(req.file, req.body)
        let bodydata = req.body;
        let data = await Category.create({
            thumbnail: req.file.filename,
            name: bodydata.name,
            slug: bodydata.slug
        });

        res.send({
            success: true,
            message: "Category Created",
            data: data
        });
    } catch (error) {
        console.log("Add Category Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};

const update = async (req, res) => {
    try {
        let bodydata = req.body;
        let data = {
            // thumbnail: req.file.filename,
            name: bodydata.name,
            slug: bodydata.slug,
        };
        console.log(data)
        console.log(req.body)

        const updatedCat = await Category.findOneAndUpdate({ _id: req.params.id }, data);
        console.log(updatedCat)
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            data: updatedCat
        });

    } catch (error) {
        console.log("Update Category  Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};
const updateImg = async (req, res) => {
    try {
        let bodydata = req.body;
        let data = {
            // thumbnail: req.file.filename,
            name: bodydata.name,
            slug: bodydata.slug,
        };


        if (req.file.filename != undefined) {
            const category = await Category.findOne({ _id: req.params.id });
            data = {
                thumbnail: req.file.filename,
                name: bodydata.name,
                slug: bodydata.slug,
            }

            fs.unlink(path + category.thumbnail, (err) => {
                if (err) {
                    return console.log('File Deleted Error ::>', err)
                }
                // console.log(  path+subCategory.thumbnail ,' file deleted')
            })
            console.log(category)
        }


        const updatedCat = await Category.findOneAndUpdate({ _id: req.params.id }, data);
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            data: updatedCat
        });

    } catch (error) {
        console.log("Update Category  Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};
const changeStatus = async (req, res) => {
    try {
        let bodydata = req.body;
        let data = {
            status: bodydata.status,
        };


        const updatedCat = await Category.findOneAndUpdate({ _id: req.params.id }, data);
        res.status(200).send({
            success: true,
            message: "Category Status Updated Successfully",
            data: updatedCat
        });

    } catch (error) {
        console.log("Update Category Status Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: 'updatecat   ' + error.message,
            data: null
        });
    }
};

const getAll = async (req, res) => {
    try {
        const categories = await Category.find({});

        // Create an array to store category data with subcategory counts
        const categoriesWithCounts = [];

        // Iterate through each category and count subcategories
        for (const category of categories) {
            const subcategoryCount = await SubCategory.countDocuments({ category: category._id });
            categoriesWithCounts.push({
                "_id": category._id,
                "name": category.name,
                "slug": category.slug,
                "thumbnail": category.thumbnail,
                "status": category.status,
                "createdAt": category.createdAt,
                "updatedAt": category.updatedAt,
                "__v": category.__v,
                "subcategoryCount": subcategoryCount,
            });
        }


        res.status(200).send({
            success: true,
            message: "Category Fetched Successfully",
            data: categoriesWithCounts
        });

    } catch (error) {
        console.log("Getall Category  Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    };
};

const getOne = async (req, res) => {
    try {
        const categories = await Category.find({ _id: req.params.id });
        res.status(200).send({
            success: true,
            message: "Category Fetched Successfully",
            data: categories
        });

    } catch (error) {
        console.log("Getall Category  Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    };
};

const deleteCat = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        const categories = await Category.deleteOne({ _id: req.params.id });
        // console.log(path+category.thumbnail)
        fs.unlink(path + category.thumbnail, (err) => {
            if (err) {
                return console.log('File Deleted Error ::>', err)
            }
            // console.log(  path+category.thumbnail ,' file deleted')
        })
        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully",
            data: categories
        });
    } catch (error) {
        console.log("Delete Category  Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
}

module.exports = {
    add,
    update,
    updateImg,
    getAll,
    getOne,
    deleteCat,
    changeStatus
}