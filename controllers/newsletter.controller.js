const Newsletteremails = require("../models/newsletter.model");

const add = async (req, res) => {
  try {

    const data = await Newsletteremails.create({
      email: req.body.email,      
    })
    res.status(200).send({
      success: true,
      message: "News letter emails Added Successfully",
      data: data
    });
  } catch (error) {
    console.log("Add Newsletteremails Error ::>", error, "Error Message ::>", error.message);
    res.status(400).send({
      success: false,
      message: error.message,
      data: null
    });
  }
}


const getAll = async (req, res) => {
  try {

    let data = await Newsletteremails.find({})

    res.status(200).send({
      success: true,
      message: "News letter emails Fetched Successfully",
      data: data
    });
  } catch (error) {
    console.log("Get One Newsletteremails Error ::>", error, "Error Message ::>", error.message);
    res.status(400).send({
      success: false,
      message: error.message,
      data: null
    });
  }
}

module.exports = {
  add,
  getAll
}