const Product = require("../models/product.model");
const ProductImages = require("../models/productImage.model");


const multer = require('multer')
const upload = multer({ dest: 'public/images/products' });


const addProductImages = (images, product_id) => {

    images.forEach((img, index, arr) => {
        ProductImages.create({
            product_id: product_id,
            name: img.filename,
            position: index + 1
        }
        )
    });
}

const add = async (req, res) => {
    try {

        let bodydata = req.body;
        console.log(bodydata)
 
        let temp = {};

        // Check if the 'thumbnailPrimary' image is present in the request
        if (req.files['thumbnailPrimary'] && req.files['thumbnailPrimary'][0]) {
            // If it's present, assign the filename to the 'thumbnailPrimary' property in the 'temp' object
            temp.thumbnailPrimary = req.files['thumbnailPrimary'][0].filename;
        }

        // Repeat the process for other image properties
        if (req.files['thumbnailSecondary'] && req.files['thumbnailSecondary'][0]) {
            temp.thumbnailSecondary = req.files['thumbnailSecondary'][0].filename;
        }

        if (req.files['productImage1'] && req.files['productImage1'][0]) {
            temp.productImage1 = req.files['productImage1'][0].filename;
        }

        if (req.files['productImage2'] && req.files['productImage2'][0]) {
            temp.productImage2 = req.files['productImage2'][0].filename;
        }

        if (req.files['productImage3'] && req.files['productImage3'][0]) {
            temp.productImage3 = req.files['productImage3'][0].filename;
        }

        if (req.files['productImage4'] && req.files['productImage4'][0]) {
            temp.productImage4 = req.files['productImage4'][0].filename;
        }

        if (req.files['productImage5'] && req.files['productImage5'][0]) {
            temp.productImage5 = req.files['productImage5'][0].filename;
        }

        if (req.files['productImage6'] && req.files['productImage6'][0]) {
            temp.productImage6 = req.files['productImage6'][0].filename;
        }

        if (req.files['productImage7'] && req.files['productImage7'][0]) {
            temp.productImage7 = req.files['productImage7'][0].filename;
        }

        if (req.files['productImage8'] && req.files['productImage8'][0]) {
            temp.productImage8 = req.files['productImage8'][0].filename;
        }
            if(bodydata.color && bodydata.size){
                temp.size = JSON.parse(bodydata.size);
            }
        
        // Now, create your payload object with the other properties
        let payload = {
            category: bodydata.category,
            subcategory: bodydata.subcategory,
            title: bodydata.title,
            slug: bodydata.slug,
            minQty: bodydata.minQty,
            productPrice: bodydata.productPrice,
            productDiscount: bodydata.productDiscount,
            productDiscountType: bodydata.productDiscountType,
            productDescription: bodydata.productDescription,
            shippingType: bodydata.shippingType,
            shippingCost: bodydata.shippingCost,
            metaTitle: bodydata.metaTitle,
            metaDescription: bodydata.metaDescription,
            metaKeyword: bodydata.metaKeyword,
            color :  bodydata.color,
            amazonRating: bodydata.amazonRating,
            amazonRatingNumber: bodydata.amazonRatingNumber,
            amazonProductLink: bodydata.amazonProductLink,
            youtubeVideo: bodydata.youtubeVideo,
            ...temp, // Add the 'temp' object containing image filenames to the payload
        };
        let data = await Product.create(payload);

        // addProductImages(req.files['productImages'], data._id);

        res.send({
            success: true,
            message: "Product Created!",
            data: data
        });
    } catch (error) {
        console.log("Add Product Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};

const deleteOne = async (req, res) => {
    try {
        const data = await Product.deleteOne({ _id: req.params.id });
        res.status(200).send({
            success: true,
            message: "Product Deleted From Cart.",
            data: data
        });
    } catch (error) {
        console.log("deleteOne Product Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};

const deleteAll = async (req, res) => {
    const deleteallprod = await Product.deleteMany({})
    res.send({
        msg: "deleted",
        data: deleteallprod
    })
}

const getAll = async (req, res) => {
    try {

        let data = await Product.find({}).populate('category subcategory');

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const proImg = await ProductImages.find({ product_id: element._id });
            element['images'] = proImg;
        }

        res.send({
            success: true,
            message: "Product data!",
            data: data
        });

    } catch (error) {
        console.log("GetAll Products Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });

    }
};

const get = async (req, res) => {
    try {
        let limit = req.params.limit || 10;
        let skip = req.params.skip || 0;
        let data = await Product.find({}).limit(limit).skip(skip).populate('category subcategory');

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const proImg = await ProductImages.find({ product_id: element._id });
            element['images'] = proImg;
        }

        res.send({
            success: true,
            message: "Product data!",
            data: data
        });

    } catch (error) {
        console.log("GetAll Products Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });

    }
};

const getOne = async (req, res) => {
    try {
        let data = await Product.findOne({ _id: req.params.id }).populate('category subcategory');
        // console.log(data)
        const proImg = await ProductImages.find({ product_id: req.params.id });
        data['images'] = proImg;

        res.status(200).send({
            success: true,
            message: "Product data!",
            data: data
        });


    } catch (error) {
        console.log("Get One Products Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};

const getByCategory = async (req, res) => {
    try {
        let data = await Product.find({ category: req.params.id }).populate('category subcategory');
        res.status(200).send({
            success: true,
            message: "Product data!",
            data: data
        });
    } catch (error) {
        console.log("Get By Category Products Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};

const getBySubCategory = async (req, res) => {
    try {
        let data = await Product.find({ subcategory: req.params.id }).populate('category subcategory');
        res.status(200).send({
            success: true,
            message: "Product data!",
            data: data
        });
    } catch (error) {
        console.log("Get By Category Products Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};

module.exports = {
    add,
    deleteOne,
    deleteAll,
    getAll,
    get,
    getOne,
    getByCategory,
    getBySubCategory,
}