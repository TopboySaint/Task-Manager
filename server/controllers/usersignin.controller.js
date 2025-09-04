const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userModel = require('../models/user.model')


const signIn = async(req, res)=>{
    try {
        const userData = {
        email: req.body.email,
        password: req.body.password
    }
    const user = await userModel.findOne({email: userData.email})
    if (!user || user == null){
        res.status(404).json({message: "User not found"})
    } else {
        const isMatch = await bcrypt.compare(userData.password, user.password)
        if(isMatch){
            const payload = { id: user._id, username: user.username };
            jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token)=>{
            if(err){
                res.status(500).json({message:"Error generating token"})
            } else{
                    res.status(200).json({message: "Staff successfully logged in", token}) 
                    
            }
        })
        } else{
            res.status(401).json({message: "Invalid Password"})         
        }
        console.log("User Found", user);  
    }
    
    } catch (error) {
        res.status(501).json({message: "Server error"});
    }
}

module.exports = signIn