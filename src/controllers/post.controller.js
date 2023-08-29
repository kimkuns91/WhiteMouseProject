const db = require("../models");

const { post : Post } = db;

const moment = require("moment");

exports.createPost = async (req, res)=>{
    try {
        const { category, title, keyword, desc } = req.body;
        const post = new Post({
            category : category,
            title : title,
            keyword : keyword,
            desc : desc,
            createdAt : moment().format("YYYY-MM-DD hh:mm:ss")
        });

        await post.save()
            .then(()=>{
                res.status(201).json({ message : "Success" })
            })
            .catch(err => console.log(err))
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
exports.findPost = async (req, res)=>{
    try {
        console.log(req.params.id)
        await Post.findOne({ _id: req.params.id })
                .then(result =>{
                    res.json(result)
                })
                .catch((err)=>{
                    res.status(404).json(err)
                })
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
exports.findAllPost = async (req, res)=>{
    try {
        await Post.find().sort({"_id" : -1})
                .then(result =>{
                    res.json(result)
                })
                .catch((err)=>{
                    res.json(err)
                })
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
exports.updatePost = async (req, res)=>{
    try {
        req.body.updatedAt = moment().format("YYYY-MM-DD hh:mm:ss");
        await Post.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(()=>{
                res.status(200).json({ message : "updated" })
            })
            .catch((err)=>{
                res.json(err)
            })
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
exports.deletePost = async (req, res)=>{
    try {
        await Post.deleteOne({ _id: req.params.id })
            .then(()=>{
                res.status(200).json({ message : "Success"})
            })
            .catch((err)=>{
                res.json(err)
            })
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.postViewUp = async (req, res)=>{
    try {
        await Post.findOneAndUpdate({ _id: req.params.id }, { $inc: { views: 1 } })
            .then(()=>{
                res.status(200).json({ message : "updated" })
            })
            .catch((err)=>{
                res.json(err)
            })
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
}