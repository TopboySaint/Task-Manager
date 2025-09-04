const bcrypt = require('bcryptjs')
const userModel = require('../models/user.model')
const saltRounds = 10;

const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new userModel({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();
        res.status(201).json({ message: "Signup successful", savedUser });
    } catch (error) {
        res.status(500).json({ message: "Error signup", error });
    }
}

module.exports = signUp