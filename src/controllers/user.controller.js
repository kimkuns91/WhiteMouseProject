const db = require("../models");
const bcrypt = require('bcrypt');

const { user : User } = db;
const { role : Role } = db;

exports.createUser = async (req, res)=>{
    try {
        const { email, username, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message : "이미 존재하는 이메일입니다." })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = await Role.findOne({ name : 'User'})
        const newUser = new User({ email, username, password : hashedPassword, roles : [userRole._id] });
        await newUser.save();

        res.status(201).json({ message : "Success" })
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.findUser = async (req, res)=>{
    const id = req.params.id
    res.json({ message : "Success" })
}
exports.updateUser = async (req, res)=>{
    console.log(req.body)
}
exports.deleteUser = async (req, res)=>{
    const id = req.params.id
    console.log(id)
}