const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        let isExist = await User.findOne({ email: req.body.email });
        if (isExist) {
            res.status(409).send({
                success: false,
                message: "This Email is already exists!!!",
            });
            return
        };

        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(req.body.password, salt);

        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: hashedPassword
        });
        res.status(200).send({
            success: true,
            message: "User Created Successfully",
            data: user
        });
    } catch (error) {
        console.log("create Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};


// User Login 
const login = async (req, res)=>{
    const user = await User.findOne({email : req.body.email});
    if(!user){ return res.status(400).json({message : "Wrong Email or password."}) }
    
    // const validPass = await bcrypt.compare( req.body.password, user.password);
    if(!user){ 
        console.log("req.body.email",req.body.email);
        console.log("req.body.password",req.body.password);
        console.log("user",user);
        console.log("validPass",validPass);
        return res.status(400).json({message : "Wrong Email or password"}) }

    // Create and assign token
    const token = jwt.sign({_id : user._id}, process.env.JWT_TOKEN);
    const adminToken = jwt.sign({_id : user._id}, process.env.JWT_TOKEN_ADMIN);
    
    res.header("auth-token", (user.isAdmin) ? adminToken : token).send({ 
        token : (user.isAdmin) ? adminToken : token,
        id : user._id
    });
};


const checkuser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user.isAdmin){
            res.status(200).send({
                status : false,
                message : 'Your are a User',
                data : {
                    isAdmin : false
                }
            })
        }else if(user.isAdmin){
            res.status(200).send({
                status : true,
                message : 'Welcome to Agwani Handicraft',
                data : {
                    isAdmin : true
                }
            })
        }
        // const user = await User.findOne(req.)
        
    } catch (error) {
        console.log("checkuser  Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};


const update = async (req, res) => {
    try {
        let user = {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
        };

        let oldPassword = req.body.oldPassword.trim();
        let newPassword = req.body.newPassword.trim();

        if (newPassword != '' && oldPassword != '') {
            let userPass = await User.findOne({ _id: req.params.id });
            const validPass = await bcrypt.compare(oldPassword, userPass.password);
            if (!validPass) { return res.status(400).json({ message: "You have entered wrong password" }) }

            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(newPassword, salt);
            console.log(user.password)
            console.log(hashedPassword)
            user.password = hashedPassword;
        }

        const updatedUser = await User.findOneAndUpdate({ _id: req.params.id },user);
        res.status(200).send({
            success: true,
            message: "User Updated Successfully",
            data: updatedUser
        });

    } catch (error) {
        console.log("update  Error ::>", error, "Error Message ::>", error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null
        });
    }
}

module.exports = {
    register,
    update,
    login,
    checkuser
}