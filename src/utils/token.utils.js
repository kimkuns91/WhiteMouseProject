const jwt = require('jsonwebtoken');


const db = require("../models");

const { user : User } = db;
const { token : Token } = db;

const { JWT_SECRET_KEY } = require('../common')

exports.makeToken = ({ email, user }) =>{
    const accessToken = jwt.sign({ 
            email,
            user
        }, 
        JWT_SECRET_KEY,
        {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: "30s", // 24 hours
        }
    );
    return accessToken;
};
exports.makeRefreshToken = async ({ email }) =>{
    const refreshToken = jwt.sign(
        {},  
        JWT_SECRET_KEY, 
        {
            algorithm: "HS256",
            expiresIn: "24h"
        }
    );
    const user = await Token.findOne({ email })
    if(user){
        user.token = refreshToken
        await user.save()
    } else {
        const refreshTokenObj = new Token({
            email,
            token: refreshToken,
        });
        await refreshTokenObj.save()
    }

    return refreshToken;
};
exports.makeRefreshTokenInfinite = async ({ email }) =>{
    const refreshToken = jwt.sign(
        {},  
        JWT_SECRET_KEY, 
        {
            algorithm: "HS256"
        }
    );
    const user = await Token.findOne({ email })
    if(user){
        user.token = refreshToken
        await user.save()
    } else {
        const refreshTokenObj = new Token({
            email,
            token: refreshToken,
        });
        await refreshTokenObj.save()
    }

    return refreshToken;
};
exports.refreshVerify = async (token, email) => {
    try {
        const user = await Token.findOne({ email });
        if (token === user.token) {
            try {
                jwt.verify(token, JWT_SECRET_KEY);
                return true;
            } catch (err) {
                return false;
            }
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

// access token 유효성 검사
exports.verify = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        return {
            ok: true,
            email: decoded.email
        };
    } catch (error) {
        return {
            ok: false,
            message: error.message,
        };
    }
};