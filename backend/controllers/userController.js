const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');


const createToken = (id) => {
    return jwt.sign({id},
        process.env.JWT_TOKEN_SECRET
    )
}
const loginUser = async(req, res) => {
    const {email,password}= req.body
    try{
        const user = await userModel.findOne({email})
        if(!user)
            return res.status(400).json({success:false,message:"Invalid email or password"})
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
            return res.status(400).json({success:false,message:"Invalid email or password"})
        const token = createToken(user._id)
        res.status(200).json({success:true,token})
    }catch(err){
        console.log(err)
        return res.status(500).json({success:false,message: 'Internal Server Error'})
    }
}

const registerUser= async(req, res) => {
    const {name,password,email} = req.body
    try{
        const exists = await userModel.findOne({email})
        if(exists)
            return res.status(400).json({success: false, message: "Email already exists"})
        if(!validator.isEmail(email))
            return res.status(400).json({success:false,message:"Invalid email"})
        if(password.length<6)
            return res.status(400).json({success:false,message:"Password should be atleast 6 characters long"})

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = userModel.create({name,email,password:hashedPassword})
        const token = createToken(user._id)
        res.status(201).json({success:true,token})

    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

module.exports={
    loginUser,
    registerUser
}