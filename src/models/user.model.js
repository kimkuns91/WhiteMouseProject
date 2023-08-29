const mongoose = require("mongoose");
const moment = require("moment");

const userSchema = new mongoose.Schema({
    email : { type: String, required: true },
    username : { type: String, required: true },
    password : { type: String, required: true },
    createdAt: { type: String, default: moment().format("YYYY-MM-DD hh:mm:ss") },
    updatedAt: { type: String },
    role: { type: String, default: 'User'},
})

const User = mongoose.model("user", userSchema);

module.exports = User;