const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common');
const { makeRefreshToken, makeRefreshTokenInfinite, makeToken } = require("../utils/token.utils");

const { user : User } = db;
const { token : Token } = db;

exports.signin = async (req, res)=>{
    try {
        const { email, password, autoLogin } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message : "존재하지 않는 이메일입니다." })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid){
            return res.status(401).json({ message : "비밀번호가 일치하지 않습니다." })
        }
        accessToken = await makeToken({ email, role : user.role })
        if(autoLogin){
            refreshToken = await makeRefreshTokenInfinite({ email })
        } else {
            refreshToken = await makeRefreshToken({ email })
        }
        res.status(200).json({ message : "Success", accessToken, refreshToken, email : user.email, username : user.username, role : user.role })
    } catch (error) {
        console.error('Error during signing:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
exports.getAuth = async (req, res)=>{
    console.log("refreshResult OK")
    const email = req.decoded.email
    const refreshToken = req.refreshToken
    const newAccessToken = await makeToken({ email });
    res.status(200).json({
        newAccessToken,
        refreshToken,
    });
}
exports.getUser = async (req, res)=>{
    console.log("getUser")
    const email = req.decoded.email
    await User.findOne({ email })
        .then(result =>{
            if(result){
                res.status(200).json({ email : result.email, username : result.username })
            }
        })
}