const mongoose = require('mongoose');
const moment = require("moment");

const postSchema = new mongoose.Schema({
    category : { type: String, required: true },
    title: { type: String, required: true },
    keyword: { type: Array },
    desc: { type: String, required: true },
    views: {
        type: Number,
        default: 0
    },    
    comment : { type: Array, default: []},
    createdAt: { type: String, default: moment().format("YYYY-MM-DD hh:mm:ss") },
    updatedAt: { type: String },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;